"""
To access and record performance data
using Chrome webdrivers in headless mode
run with 'python3 performance-test.py'
"""
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait


def javascript():
    with open('fps-counter.js') as f:
        content = f.readlines()
    js = "".join(content)
    javascript = "\
        var doc = window.document;\
        var script = doc.createElement(\"script\");\
        script.innerHTML=\"%s\";\
        doc.body.appendChild(script);" % (js.strip()\
            .replace('\t','').replace("\n", "").replace('"','\\"'))
    return javascript

chrome_options = Options()
chrome_options.headless = True
chrome_options.add_argument('--start-maximized')

hyperlink = "https://modest-curran-4f504d.netlify.app/"

browser = webdriver.Chrome(options=chrome_options)
browser.get(hyperlink)

navigation_start = browser.execute_script("return window.performance.timing.navigationStart")
response_start = browser.execute_script("return window.performance.timing.responseStart")
dom_complete = browser.execute_script("return window.performance.timing.domComplete")
memory = browser.execute_script("return window.performance.memory.totalJSHeapSize")

browser.execute_script(javascript())
waiting = WebDriverWait(browser, 10).until(lambda driver: browser.execute_script("return window.fps_arr[5];"))
fps_arr = browser.execute_script("return window.fps_arr")

backend_performance_calc = response_start - navigation_start
frontend_performance_calc = dom_complete - response_start

# print("navigation_start: %s" % navigation_start) # timestamp
# print("response_start: %s" % response_start) # timestamp
# print("dom_complete: %s" % dom_complete) # timestamp
print("Back End: %s" % backend_performance_calc)
print("Front End: %s" % frontend_performance_calc)
print("Total js heap size: %s" % memory) # Kolla upp exakt mått
# print(waiting)
print(fps_arr)


browser.quit()
