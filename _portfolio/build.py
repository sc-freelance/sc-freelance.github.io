"""Build portfolio/Saad-Chughtai-Portfolio.pdf from _portfolio/portfolio.html.

Run from the repository root:   python3 _portfolio/build.py
Needs:  pip install playwright   and   python3 -m playwright install chromium
"""
from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parent.parent
src = root / "_portfolio" / "portfolio.html"
out = root / "portfolio" / "Saad-Chughtai-Portfolio.pdf"
out.parent.mkdir(exist_ok=True)

footer = ('<div style="width:100%;font-size:7.5pt;color:#6b7079;font-family:Inter,Arial,sans-serif;'
          'padding:0 16mm;display:flex;justify-content:space-between">'
          '<span>Saad Chughtai · Portfolio</span>'
          '<span>sc-freelance.github.io · <span class="pageNumber"></span>/<span class="totalPages"></span></span></div>')

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(src.as_uri())
    page.wait_for_load_state("networkidle")
    page.pdf(path=str(out), format="A4", print_background=True, prefer_css_page_size=True,
             display_header_footer=True, header_template="<span></span>", footer_template=footer)
    browser.close()
print("Wrote", out)
