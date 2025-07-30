import { Given, When, Then } from '@wdio/cucumber-framework';
import { $ } from '@wdio/globals';

Given('a button with text {string} is added to the DOM', async (text: string) => {
    await browser.execute((buttonText) => {
        const component = document.createElement('button');
        component.innerHTML = buttonText;
        document.body.appendChild(component);
    }, text);
    // Pause the browser session to keep it open
    await browser.debug();
});

Then('the button with text {string} should be present', async (text: string) => {
    await expect($(`aria/${text}`)).toBePresent();
    // Pause the browser session to keep it open
    await browser.debug();
});

When('the button with text {string} is removed from the DOM', async (text: string) => {
    await browser.execute((buttonText) => {
        const component = Array.from(document.querySelectorAll('button')).find(
            (btn) => btn.textContent === buttonText
        );
        if (component) {
            component.remove();
        }
    }, text);
    // Pause the browser session to keep it open
    await browser.debug();
});

Then('the button with text {string} should not be present', async (text: string) => {
    await expect($(`aria/${text}`)).not.toBePresent();

    await browser.execute(() => {
        console.log('execution step 1');
    });

    await browser.pause(2000);

    await browser.execute(() => {
        console.log('execution step 2');
    });

    // Pause the browser session to keep it open
    await browser.debug();
});