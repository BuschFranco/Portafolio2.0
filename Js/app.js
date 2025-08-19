document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('inicio');
    const welcome = document.getElementById('welcomeSec-Conteiner');
    const welcomeHeight = welcome.offsetHeight;

    window.addEventListener('scroll', () => {
        if (window.scrollY > welcomeHeight) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    });
});

window.onload = checkResolution;

function checkResolution() {
  var screenWidth = window.innerWidth;
  var myDiv = document.getElementById('chatbot-body');
  
  if (screenWidth < 800) {
      myDiv.classList.remove('visible');
      myDiv.classList.add('hidden');
  } else {
      myDiv.classList.remove('hidden');
      myDiv.classList.add('visible');
  }
}

function toggleChat() {
  const chatBody = document.getElementById('chatbot-body');
  if (chatBody.classList.contains('hidden')) {
      chatBody.classList.remove('hidden');
      chatBody.classList.add('visible');
  } else {
      chatBody.classList.remove('visible');
      chatBody.classList.add('hidden');
  }
}


function transferToForm(description) {
    // Transferir la información al formulario
    document.getElementById('mensaje').value = `Estoy interesado en el plan "${description}". Tengo varias ideas para mi página y me gustaría discutirlas en detalle... `;
    
    // Opcional: Desplazarse hasta el formulario
    document.getElementById('contact-desc').scrollIntoView({ behavior: 'smooth' });
  }


  //función que se encarga de detectar los valores de la lista de idiomas
  function handleDropdownChange() {
    var selectElement = document.getElementById("opciones");
    var selectedValue = selectElement.value;
    changeLanguage(selectedValue);
}

  const textsToChange = document.querySelectorAll("[data-section]");
  //función que devuelve el valor de la lista
  async function changeLanguage(language) {
    try {
        console.log(`Changing language to: ${language}`);
        const requestJson = await fetch(`./Languages/${language}.json`);
        console.log(`Fetch status: ${requestJson.status}`); // Log status

        if (!requestJson.ok) {
            throw new Error(`HTTP error! status: ${requestJson.status}`);
        }

        const texts = await requestJson.json();
        console.log("Texts loaded successfully:", texts); // Log loaded texts

        for (const textToChange of textsToChange) {
            const section = textToChange.dataset.section;
            const value = textToChange.dataset.value;
            console.log(`Updating section: ${section}, value: ${value}`); // Log sections and values
            textToChange.innerHTML = texts[section][value];
        }

        console.log(texts["comoTrabajamos"]);
    } catch (error) {
        console.error("Error loading language file:", error);
    }
}

// Función para animaciones elegantes en scroll
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    // Aplicar clases de animación a elementos existentes
    // Títulos principales
    const mainTitles = document.querySelectorAll('h1, h2.display-4, .display-1');
    mainTitles.forEach(title => {
        title.classList.add('animate-slide-left');
        observer.observe(title);
    });

    // Subtítulos y párrafos
    const textElements = document.querySelectorAll('h3, h4, p, .lead');
    textElements.forEach(text => {
        text.classList.add('animate-slide-up');
        observer.observe(text);
    });

    // Tarjetas y contenedores
    const cards = document.querySelectorAll('.card, .col-md-4, .col-lg-4, .feature-item');
    cards.forEach(card => {
        card.classList.add('animate-fade-scale', 'hover-lift', 'hover-glow');
        observer.observe(card);
    });

    // Botones
    const buttons = document.querySelectorAll('.btn, button');
    buttons.forEach(btn => {
        btn.classList.add('hover-lift');
    });

    // Imágenes
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.classList.add('animate-fade-scale');
        observer.observe(img);
    });
}

window.embeddedChatbotConfig = {
    chatbotId: "2JOdCymMabN1vCiyUg7ZO",
    domain: "www.chatbase.co"
};

// Función para efecto typewriter con wrap
function typewriterEffect() {
    const h1Element = document.querySelector('#slogan-Conteiner h1');
    if (!h1Element) return;
    
    const originalText = h1Element.textContent;
    h1Element.innerHTML = '<span class="typewriter-text"></span><span class="cursor"></span>';
    
    const textSpan = h1Element.querySelector('.typewriter-text');
    let i = 0;
    
    function typeChar() {
        if (i < originalText.length) {
            textSpan.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeChar, 80); // Velocidad de escritura
        }
    }
    
    // Iniciar después de 500ms
    setTimeout(typeChar, 500);
}

// Inicializar animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    typewriterEffect();
});


   

  