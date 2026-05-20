let urlCount = 1;

document.getElementById('add-url').addEventListener('click', function() {
    let newLabel = document.createElement('label');
    newLabel.setAttribute('for', 'url-' + urlCount);
    newLabel.textContent = 'Your URL:';

    let newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('id', 'url-' + urlCount);
    newInput.setAttribute('name', 'url-' + urlCount);
    newInput.required = true;

    let urlContainer = document.getElementById('url-container');
    urlContainer.appendChild(newLabel);
    urlContainer.appendChild(newInput);

    urlCount++;
});

//Generating the links and COPY function

document.getElementById('utm-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let source = document.getElementById('source').value;
    let medium = document.getElementById('medium').value;
    let campaign = document.getElementById('campaign').value;
    let term = document.getElementById('term').value;

    let container = document.getElementById('generated-urls-container');
    container.innerHTML = '';

    for (let i = 0; i < urlCount; i++) {
        let url = document.getElementById('url-' + i).value;

        let utmUrl = buildUTMUrl(url, source, medium, campaign, term);

        let newPara = document.createElement('p');
        newPara.textContent = utmUrl;

        let newButton = document.createElement('button');
        newButton.textContent = 'Copy URL';
        newButton.classList.add('copy-button');
        newButton.addEventListener('click', function() {
            let tempElement = document.createElement('textarea');
            tempElement.value = newPara.textContent;
            document.body.appendChild(tempElement);

            tempElement.select();
            document.execCommand('copy');

            document.body.removeChild(tempElement);

            showCopyNotification('Your URL is now copied!');
        });

        container.appendChild(newPara);
        container.appendChild(newButton);
    }
});

// Click event listener to each preset button

const presetButtons = document.querySelectorAll('.preset');
presetButtons.forEach(button => {
    button.addEventListener('click', function() {
        const source = this.getAttribute('data-source');
        const medium = this.getAttribute('data-medium');
        const campaign = this.getAttribute('data-campaign');
        const term = this.getAttribute('data-term');
        
        document.getElementById('source').value = source;
        document.getElementById('medium').value = medium;
        document.getElementById('campaign').value = campaign;
        document.getElementById('term').value = term;
    });
});

// Building the UTM parameters

function buildUTMUrl(baseURL, utmSource, utmMedium, utmCampaign, utmTerm) {
    if (!baseURL.match(/^https?:\/\//)) {
        baseURL = 'https://' + baseURL;
    }
    let url = new URL(baseURL);
    if (utmSource) {
        url.searchParams.set('utm_source', utmSource);
    }
    if (utmMedium) {
        url.searchParams.set('utm_medium', utmMedium);
    }
    if (utmCampaign) {
        url.searchParams.set('utm_campaign', utmCampaign);
    }
    if (utmTerm) {
        url.searchParams.set('utm_term', utmTerm);
    }
    return url.toString();
}


document.getElementById('linkedin-personal').addEventListener('click', function() {
    let campaignInput = document.getElementById('campaign');
    if (!campaignInput.value) {
        alert('For LinkedIn - personal, the campaign parameter is mandatory. Please fill it out.');
        campaignInput.focus();
    }
});

// Custom copy notification popup

function showCopyNotification(message) {
    let overlay = document.createElement('div');
    overlay.classList.add('copy-overlay');
    document.body.appendChild(overlay);

    let notification = document.createElement('div');
    notification.classList.add('copy-notification');
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
        overlay.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        overlay.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
            document.body.removeChild(overlay);
        }, 300);
    }, 1000);
}

// Click on logo refresh the page

document.getElementById('refresh-logo').addEventListener('click', function(event) {
    event.preventDefault(); // This prevents the default behavior of the anchor tag
    location.reload();
});
