from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import time

driver_path = "/Users/madushalakshan026/Desktop/Development/FMT-WEBAPP/FMT-backend/FMT-WEB-APP-BACKEND/chromedriver/mac_arm-131.0.6778.109/chromedriver-mac-arm64/chromedriver"

service = Service(driver_path)

driver = webdriver.Chrome(service=service) 

try:
    driver.get("http://localhost:3000")
    driver.maximize_window()

    # Wait for email input to be visible
    WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, "input[type='email']"))
    )

    email_input = driver.find_element(By.CSS_SELECTOR, "input[type='email']")
    password_input = driver.find_element(By.CSS_SELECTOR, "input[type='password']")
    signin_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")


    email_input.send_keys("maleesha.sandeepa@fot.sjp.ac.lk")
    password_input.send_keys("maleesha1234")
    signin_button.click()

    # Wait for the home page to load or title change
    WebDriverWait(driver, 10).until(
        lambda driver: "home" in driver.title or driver.current_url == "http://localhost:3000/home"
    )
    print("Signin test passed")




finally:
    # Step 5: Clean up
    driver.quit()