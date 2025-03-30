document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling
  document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const section = document.querySelector(this.getAttribute('href'));
          section.scrollIntoView({ behavior: 'smooth' });
      });
  });

  // Active nav link
  window.addEventListener('scroll', () => {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('nav a');
      const root = document.documentElement;
      const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color');
      const textColor = getComputedStyle(root).getPropertyValue('--text-color');
      
      sections.forEach((section, index) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (window.pageYOffset >= sectionTop - 60) {
              navLinks.forEach(link => {
                  link.style.color = link.getAttribute('href').slice(1) === section.id ? 
                      primaryColor : textColor;
              });
          }
      });
  });

  // Intersection Observer
  const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
              entry.target.style.animation = `fadeInUp 0.6s ${index * 0.1}s forwards`;
          }
      });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
  });

  // Add click effect to contact links
  document.querySelectorAll('.contact-link').forEach(link => {
      link.addEventListener('click', function(e) {
          this.classList.add('clicked');
          setTimeout(() => {
              this.classList.remove('clicked');
          }, 300);
      });
  });
});