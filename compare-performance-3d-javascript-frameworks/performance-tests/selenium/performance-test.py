"""
To access and record performance data
using Chrome webdrivers in headless mode
fixa döpa om namn till python...
"""
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options


def javascript():
    with open('performance-test.js') as f:
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
# chrome_options.headless = True
# chrome_options.add_argument('--start-maximized')

hyperlink = "https://modest-curran-4f504d.netlify.app/"

browser = webdriver.Chrome(options=chrome_options)
browser.get(hyperlink)


navigationStart = browser.execute_script("return window.performance.timing.navigationStart")
responseStart = browser.execute_script("return window.performance.timing.responseStart")
domComplete = browser.execute_script("return window.performance.timing.domComplete")
memory = browser.execute_script("return window.performance.memory.totalJSHeapSize")

browser.execute_script(javascript())
# time.sleep(5)
fps_arr = browser.execute_script("return window.fps_arr")

print("navigationStart: %s" % navigationStart) # timestamp
print("responseStart: %s" % responseStart) # timestamp
print("domComplete: %s" % domComplete) # timestamp
print("TotalJSHeapSize: %s" % memory) # Kolla upp exakt mått
print(fps_arr)
# print(fps_arr)

# browser.quit()
