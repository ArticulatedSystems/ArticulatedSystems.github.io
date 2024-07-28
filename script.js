function redirectTo(page) {
    window.location.href = page;
}

document.addEventListener('DOMContentLoaded', function() {
    // URLs of the YouTube videos to preload
    const videoUrls = [
        'https://www.youtube.com/embed/qIazPStT87Y?si=gCwMgY2u3fCJ4EHA&start=80&end=624&autoplay=1&mute=1',
        'https://www.youtube.com/embed/m6swATKSTog?si=_2BY1K6XaSo6NafQ&start=80&end=624&autoplay=1&mute=1',
        'https://www.youtube.com/embed/cwOJgj0Hvv8?si=AFWhN4HQ1jeBznoo&start=80&end=624&autoplay=1&mute=1',
        'https://www.youtube.com/embed/fWkwXNmpbcM?si=yEV2HLIN3TFYSsEs&start=80&end=624&autoplay=1&mute=1',
    ];

    // Create and load invisible iframes
    videoUrls.forEach(url => {
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.style.display = 'none'; // Hide iframe from view
        iframe.setAttribute('loading', 'eager'); // Start loading immediately
        document.body.appendChild(iframe); // Add iframe to the body
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const iframes = document.querySelectorAll('iframe');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                iframe.src = iframe.getAttribute('data-src');
                observer.unobserve(iframe);
            }
        });
    });

    iframes.forEach(iframe => {
        iframe.setAttribute('data-src', iframe.src);
        iframe.src = ''; // Empty the src to delay loading
        observer.observe(iframe);
    });
});