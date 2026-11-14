"""Create the website's predictable, print-ready two-page A4 resume.

Run node scripts/export-resume-data.cjs first. Requires reportlab.
"""
import json
import re
import shutil
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
data = json.loads((ROOT / 'tmp/pdfs/resume-data.json').read_text(encoding='utf-8'))
profile, resume = data['profile'], data['resume']
OUT = ROOT / 'output/pdf/Sharif-Jamo-Resume.pdf'
OUT.parent.mkdir(parents=True, exist_ok=True)
INK = colors.HexColor('#17221e')
MUTED = colors.HexColor('#53615a')
GREEN = colors.HexColor('#3e634e')
LINE = colors.HexColor('#d9e1dc')
PALE = colors.HexColor('#f4f7f4')
WIDTH = A4[0] - 32 * mm

styles = {
    'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=28, leading=32, textColor=INK),
    'title': ParagraphStyle('title', fontName='Helvetica', fontSize=10.2, leading=15, textColor=GREEN),
    'contact': ParagraphStyle('contact', fontName='Helvetica', fontSize=8.2, leading=12, textColor=MUTED),
    'body': ParagraphStyle('body', fontName='Helvetica', fontSize=9.1, leading=12.7, textColor=INK),
    'small': ParagraphStyle('small', fontName='Helvetica', fontSize=8.3, leading=11.6, textColor=MUTED),
    'section': ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=9.4, leading=14, spaceAfter=9, textColor=GREEN),
    'role': ParagraphStyle('role', fontName='Helvetica-Bold', fontSize=10.2, leading=13.4, textColor=INK),
    'date': ParagraphStyle('date', fontName='Helvetica', fontSize=8.1, leading=13.4, alignment=TA_RIGHT, textColor=MUTED),
    'subhead': ParagraphStyle('subhead', fontName='Helvetica-Bold', fontSize=9.3, leading=13, spaceAfter=5, textColor=INK),
    'bullet': ParagraphStyle('bullet', fontName='Helvetica', fontSize=9.0, leading=12.6, leftIndent=10, firstLineIndent=-8, spaceAfter=3, textColor=INK),
}

def clean(value):
    return re.sub('[\u2010-\u2015\u2212]', '-', str(value)).replace('\u00a0', ' ')

def p(value, style='body'):
    return Paragraph(escape(clean(value)), styles[style])

def link(label, url):
    return Paragraph(f'<link href="{escape(url, {chr(34): "&quot;"})}" color="#3e634e">{escape(clean(label))}</link>', styles['contact'])

def section(label):
    return [Spacer(1, 12), p(label.upper(), 'section')]

def card(title, body):
    content = [p(title, 'subhead'), *body]
    box = Table([[content]], colWidths=[(WIDTH - 16) / 2], rowHeights=[96])
    box.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BACKGROUND', (0, 0), (-1, -1), PALE),
        ('BOX', (0, 0), (-1, -1), .5, LINE),
        ('LEFTPADDING', (0, 0), (-1, -1), 11), ('RIGHTPADDING', (0, 0), (-1, -1), 11),
        ('TOPPADDING', (0, 0), (-1, -1), 10), ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
    ]))
    return box

def columns(left, right):
    table = Table([[left, '', right]], colWidths=[(WIDTH - 16) / 2, 16, (WIDTH - 16) / 2])
    table.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0), ('TOPPADDING', (0, 0), (-1, -1), 0), ('BOTTOMPADDING', (0, 0), (-1, -1), 0)]))
    return table

story = [p(profile['name'], 'name'), Spacer(1, 5), p(profile['title'], 'title'), Spacer(1, 7)]
story.append(p(f"{profile['location']}   |   {data['email']}   |   sharifjamo.com", 'contact'))
story.extend([Spacer(1, 13), p(resume['summary']), *section('Professional experience')])
for item in data['experience']:
    header = Table([[p(item['role'], 'role'), p(f"{item['start']} - {item['end']}", 'date')]], colWidths=[WIDTH * .72, WIDTH * .28])
    header.setStyle(TableStyle([('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0), ('TOPPADDING', (0, 0), (-1, -1), 0), ('BOTTOMPADDING', (0, 0), (-1, -1), 3), ('VALIGN', (0, 0), (-1, -1), 'TOP')]))
    block = [header, p(f"{item['company']} | {item['location']}", 'small'), Spacer(1, 6)]
    # Concise print highlights; the full work history remains on the web resume.
    block.extend(p('- ' + line, 'bullet') for line in item['highlights'][:3])
    block.append(Spacer(1, 12))
    story.append(KeepTogether(block))

story.extend([PageBreak(), p(profile['name'], 'role'), p('Expertise, qualifications & community', 'small'), *section('Core expertise')])
groups = resume['skillGroups']
for offset in [0, 2]:
    story.append(columns(*[card(group['title'], [p(' / '.join(group['skills']), 'small')]) for group in groups[offset:offset + 2]]))
    story.append(Spacer(1, 10))

story.extend(section('Education & credentials'))
education = []
for item in resume['education']:
    education.extend([p(item['title'], 'subhead'), p(item['place'], 'small'), p(item['period'], 'small'), Spacer(1, 11)])
education.extend([p('Languages', 'subhead')])
education.extend(p(f"{item['language']} - {item['level']}", 'small') for item in resume['languages'])
education.extend([Spacer(1, 11), p('Professional links', 'subhead')])
education.extend(link(f"{item['name']}: {item['handle']}", item['url']) for item in data['socials'])
certifications = []
for item in resume['certifications']:
    certifications.extend([p(item['name'], 'subhead'), p(f"{item['issuer']} | {item['year']}", 'small'), Spacer(1, 9)])
story.append(columns(education, certifications))

story.extend(section('Community & references'))
community = []
for item in resume['volunteering']:
    community.extend([p(item['title'], 'subhead'), p(item['place'], 'small'), p(item['period'], 'small'), Spacer(1, 4), p(item['detail'], 'small'), Spacer(1, 10)])
references = []
for item in data['testimonials']:
    references.extend([p(item['name'], 'subhead'), p(item['role'], 'small'), Spacer(1, 12)])
story.append(columns(community, references))

def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(.5)
    canvas.line(16 * mm, 14 * mm, A4[0] - 16 * mm, 14 * mm)
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(16 * mm, 9.5 * mm, 'SHARIF JAMO  /  RESUME')
    canvas.drawRightString(A4[0] - 16 * mm, 9.5 * mm, f'{doc.page} / 2')
    canvas.restoreState()

doc = SimpleDocTemplate(str(OUT), pagesize=A4, topMargin=16 * mm, bottomMargin=20 * mm, leftMargin=16 * mm, rightMargin=16 * mm, title='Sharif Jamo - Resume', author=profile['name'])
doc.build(story, onFirstPage=footer, onLaterPages=footer)
website_copy = ROOT / 'public/resume/Sharif-Jamo-Resume.pdf'
website_copy.parent.mkdir(parents=True, exist_ok=True)
shutil.copyfile(OUT, website_copy)
print(OUT)
