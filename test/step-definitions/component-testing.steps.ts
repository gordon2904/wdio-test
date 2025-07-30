import { Given, When, Then } from '@wdio/cucumber-framework';
import { $ } from '@wdio/globals';

Given('a button with text {string} is added to the DOM', async (text: string) => {

    await browser.url('https://www.google.co.uk');

    const button = await $('button.tHlp8d#W0wltc');
    await button.waitForExist({ timeout: 5000 });
    await button.isClickable();

    await button.click();

    await browser.execute((buttonText) => {
        // <button id="W0wltc" class="tHlp8d" data-ved="0ahUKEwiC79iJwOWOAxV3RUEAHfEmK3UQ4cIICIEB"><div class="QS5gu sy4vM" role="none">Reject all</div></button>
        // <button id="W0wltc" class="tHlp8d" data-ved="0ahUKEwi-rpbLv-WOAxVGXEEAHQMOAmkQ4cIICIEB"><div class="QS5gu sy4vM" role="none">Reject all</div></button>
        // <div class="QS5gu sy4vM" role="none">Reject all</div>




        const component = document.createElement('button');
        component.innerHTML = buttonText;
        document.body.appendChild(component);
    }, text);
});

Then('the button with text {string} should be present', async (text: string) => {
    await expect($(`aria/${text}`)).toBePresent();
    // Pause the browser session to keep it open
    
    await browser.execute(() => {
        console.log('finished checking for button and PAUSE');
    });
    await browser.pause(5000);

    await browser.execute(() => {
        console.log('finished pause');
    });
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