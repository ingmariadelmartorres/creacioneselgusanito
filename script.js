// Variables globales
let currentFilter = 'todos';
let currentPage = 1;
const itemsPerPage = 12;
let allProducts = [];

// Navegación móvil
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Manejo del formulario
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Aquí normalmente se enviaría el formulario a un servidor
        // Por ahora solo mostraremos un mensaje de éxito
        alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
        contactForm.reset();
    });
}

// ============================================
// GALERÍA DE PRODUCTOS - FUNCIONALIDAD
// ============================================

// Inicializar la galería cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    setupFilters();
    setupLoadMore();
});

// Inicializar la galería
function initializeGallery() {
    // Cargar productos de ejemplo
    loadSampleProducts();
    
    // Mostrar primera página
    displayProducts(currentFilter, currentPage);
    
    // Configurar Intersection Observer para lazy loading
    setupIntersectionObserver();
}

// Configurar filtros
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Añadir clase active al botón clickeado
            this.classList.add('active');
            
            // Cambiar filtro actual
            currentFilter = this.getAttribute('data-filter');
            currentPage = 1;
            
            // Mostrar productos del filtro seleccionado
            displayProducts(currentFilter, currentPage);
            
            // Desplazar a la galería si no está visible
            const gallerySection = document.getElementById('galeria');
            if (gallerySection.getBoundingClientRect().top < 0 || 
                gallerySection.getBoundingClientRect().top > window.innerHeight) {
                window.scrollTo({
                    top: gallerySection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Configurar filtros en el footer
    document.querySelectorAll('.footer-links a[data-filter]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const filter = this.getAttribute('data-filter');
            
            // Activar el filtro correspondiente
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-filter') === filter) {
                    btn.classList.add('active');
                }
            });
            
            // Cambiar filtro actual
            currentFilter = filter;
            currentPage = 1;
            
            // Mostrar productos del filtro seleccionado
            displayProducts(currentFilter, currentPage);
            
            // Desplazar a la galería
            const gallerySection = document.getElementById('galeria');
            window.scrollTo({
                top: gallerySection.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
}

// Configurar botón "Cargar Más"
function setupLoadMore() {
    const loadMoreBtn = document.getElementById('loadMore');
    if (!loadMoreBtn) return;
    
    loadMoreBtn.addEventListener('click', function() {
        loadMoreProducts();
    });
}

// Configurar Intersection Observer para lazy loading
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                    img.classList.remove('loading');
                }
                
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px',
        threshold: 0.1
    });
    
    // Observar todas las imágenes con data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        observer.observe(img);
    });
}

// Cargar productos de ejemplo (reemplaza esto con tus productos reales)
function loadSampleProducts() {
    // EJEMPLO: Aquí defines tus productos
    // Reemplaza esto con tus productos reales
    allProducts = [
        // Cinta Delgada
        { id: 1, category: 'delgadas', name: 'Cintas Delgadas1', description: 'Hermosas Cintas Delgadas', image: 'assets/galeria/MODELO1.jpg' },
        { id: 2, category: 'delgadas', name: 'Cintas Delgadas2', description: 'Cintas Delgadas para Niñas', image: 'assets/galeria/MODELO1-2.jpg' },
        { id: 3, category: 'delgadas', name: 'Cintas Delgadas3', description: 'Cintas Delgadas con Lazo', image: 'assets/galeria/MODELO1-3.jpg' },
        { id: 1, category: 'delgadas', name: 'Cintas Delgadas4', description: 'Hermosas Cintas Delgadas', image: 'assets/galeria/MODELO1-5.jpg' },
        { id: 2, category: 'delgadas', name: 'Cintas Delgadas5', description: 'Cintas Delgadas para Niñas', image: 'assets/galeria/MODELO1-6.jpg' },
        { id: 3, category: 'delgadas', name: 'Cintas Delgadas6', description: 'Cintas Delgadas con Lazo', image: 'assets/galeria/MODELO1-7.jpg' },
        { id: 1, category: 'delgadas', name: 'Cintas Delgadas7', description: 'Hermosas Cintas Delgadas', image: 'assets/galeria/MODELO1-8.jpg' },
        { id: 2, category: 'delgadas', name: 'Cintas Delgadas8', description: 'Cintas Delgadas para Niñas', image: 'assets/galeria/MODELO1-9.jpg' },
        { id: 3, category: 'delgadas', name: 'Cintas Delgadas9', description: 'Cintas Delgadas con Lazo', image: 'assets/galeria/MODELO1-10.jpg' },
        { id: 1, category: 'delgadas', name: 'Cintas Delgadas10', description: 'Hermosas Cintas Delgadas', image: 'assets/galeria/MODELO1-11.jpg' },
        { id: 2, category: 'delgadas', name: 'Cintas Delgadas11', description: 'Cintas Delgadas para Niñas', image: 'assets/galeria/MODELO1-12.jpg' },
        { id: 3, category: 'delgadas', name: 'Cintas Delgadas12', description: 'Cintas Delgadas con Lazo', image: 'assets/galeria/MODELO1-13.jpg' },
        { id: 1, category: 'delgadas', name: 'Cintas Delgadas13', description: 'Hermosas Cintas Delgadas', image: 'assets/galeria/MODELO1-14.jpg' },
        { id: 2, category: 'delgadas', name: 'Cintas Delgadas14', description: 'Cintas Delgadas para Niñas', image: 'assets/galeria/MODELO1-19.jpg' },
        { id: 3, category: 'delgadas', name: 'Cintas Delgadas15', description: 'Cintas Delgadas con Lazo', image: 'assets/galeria/MODELO1-20.jpg' },
        { id: 1, category: 'delgadas', name: 'Cintas Delgadas16', description: 'Hermosas Cintas Delgadas', image: 'assets/galeria/MODELO1-25.jpg' },
        { id: 2, category: 'delgadas', name: 'Cintas Delgadas17', description: 'Cintas Delgadas para Niñas', image: 'assets/galeria/MODELO1-26.jpg' },
        { id: 3, category: 'delgadas', name: 'Cintas Delgadas18', description: 'Cintas Delgadas con Lazo', image: 'assets/galeria/MODELO1-29.jpg' },

        // Cintillos
        { id: 4, category: 'cintillos', name: 'Hermosos Cintillos con Lazo1', description: 'Cintillos Hermosos con Lazo', image: 'assets/galeria/MODELO2-1.jpg' },
        { id: 5, category: 'cintillos', name: 'Hermosos Cintillos con Lazo2', description: 'Cintillos Hermosos con Lazo', image: 'assets/galeria/MODELO2-2.jpg' },
        { id: 6, category: 'cintillos', name: 'Hermosos Cintillos con Lazo3', description: 'Cintillos Hermosos con Lazo', image: 'assets/galeria/MODELO2-3.jpg' },
        { id: 4, category: 'cintillos', name: 'Hermosos Cintillos con Lazo4', description: 'Cintillos Hermosos con Lazo', image: 'assets/galeria/MODELO2-4.jpg' },
        { id: 5, category: 'cintillos', name: 'Hermosos Cintillos con Lazo5', description: 'Cintillos Hermosos con Lazo', image: 'assets/galeria/MODELO2-5.jpg' },
        { id: 6, category: 'cintillos', name: 'Hermosos Cintillos con Lazo6', description: 'Cintillos Hermosos con Lazo', image: 'assets/galeria/MODELO2-6.jpg' },
        { id: 4, category: 'cintillos', name: 'Hermosos Cintillos con Lazo7', description: 'Cintillos Hermosos con Lazo', image: 'assets/galeria/MODELO2-7.jpg' },
        { id: 5, category: 'cintillos', name: 'Hermosos Cintillos con Lazo8', description: 'Cintillos Hermosos con Lazo', image: 'assets/galeria/MODELO2-8.jpg' },
        { id: 6, category: 'cintillos', name: 'Hermosos Cintillos con Lazo9', description: 'Cintillos Hermosos con Lazo', image: 'assets/galeria/MODELO2-9.jpg' },
        { id: 4, category: 'cintillos', name: 'Hermosos Cintillos con Lazo10', description: 'Cintillos Hermosos con Lazo', image: 'assets/galeria/MODELO2-10.jpg' },
        { id: 5, category: 'cintillos', name: 'Hermosos Cintillos con Lazo11', description: 'Cintillos Hermosos con Lazo', image: 'assets/galeria/MODELO2-11.jpg' },
        { id: 6, category: 'cintillos', name: 'Hermosos Cintillos con Lazo12', description: 'Cintillos Hermosos con Lazo', image: 'assets/galeria/MODELO2-17.jpg' },
        { id: 4, category: 'cintillos', name: 'Hermosos Cintillos con Lazo13', description: 'Cintillos Hermosos con Lazo', image: 'assets/galeria/MODELO2-21.jpg' },
        { id: 5, category: 'cintillos', name: 'Hermosos Cintillos con Lazo14', description: 'Cintillos Hermosos con Lazo', image: 'assets/galeria/MODELO2-23.jpg' },
        { id: 6, category: 'cintillos', name: 'Hermosos Cintillos con Lazo15', description: 'Cintillos Hermosos con Lazo', image: 'assets/galeria/MODELO2-24.jpg' },
        { id: 4, category: 'cintillos', name: 'Hermosos Cintillos con Lazo16', description: 'Cintillos Hermosos con Lazo', image: 'assets/galeria/MODELO2-25.jpg' },
        { id: 5, category: 'cintillos', name: 'Hermosos Cintillos con Lazo17', description: 'Cintillos Hermosos con Lazo', image: 'assets/galeria/MODELO2-26.jpg' },
        { id: 6, category: 'cintillos', name: 'Hermosos Cintillos con Lazo18', description: 'Cintillos Hermosos con Lazo', image: 'assets/galeria/MODELO2-28.jpg' },
        { id: 4, category: 'cintillos', name: 'Hermosos Cintillos con Lazo19', description: 'Cintillos Hermosos con Lazo', image: 'assets/galeria/MODELO2-30.jpg' },
        { id: 5, category: 'cintillos', name: 'Hermosos Cintillos con Lazo20', description: 'Cintillos Hermosos con Lazo', image: 'assets/galeria/MODELO2-32.jpg' },
        { id: 6, category: 'cintillos', name: 'Hermosos Cintillos con Lazo21', description: 'Cintillos Hermosos con Lazo', image: 'assets/galeria/MODELO2-41.jpg' },
        { id: 6, category: 'cintillos', name: 'Hermosos Cintillos con Lazo22', description: 'Cintillos Hermosos con Lazo', image: 'assets/galeria/MODELO2.jpg' },
        // Cinta Gruesa
        { id: 7, category: 'gruesas', name: 'Cintas Gruesas1', description: 'Hermosa Cinta Gruesa', image: 'assets/galeria/MODELO3-3.jpg' },
        { id: 8, category: 'gruesas', name: 'Cintas Gruesas2', description: 'Hermosa Cinta Gruesa', image: 'assets/galeria/MODELO3-4.jpg' },
        { id: 9, category: 'gruesas', name: 'Cintas Gruesas3', description: 'Hermosa Cinta Gruesa', image: 'assets/galeria/MODELO3-5.jpg' },
        { id: 7, category: 'gruesas', name: 'Cintas Gruesas4', description: 'Hermosa Cinta Gruesa', image: 'assets/galeria/MODELO3-6.jpg' },
        { id: 8, category: 'gruesas', name: 'Cintas Gruesas5', description: 'Hermosa Cinta Gruesa', image: 'assets/galeria/MODELO3-18.jpg' },
        { id: 9, category: 'gruesas', name: 'Cintas Gruesas6', description: 'Hermosa Cinta Gruesa', image: 'assets/galeria/MODELO3-19.jpg' },
        { id: 7, category: 'gruesas', name: 'Cintas Gruesas7', description: 'Hermosa Cinta Gruesa', image: 'assets/galeria/MODELO3-20.jpg' },
        { id: 8, category: 'gruesas', name: 'Cintas Gruesas8', description: 'Hermosa Cinta Gruesa', image: 'assets/galeria/MODELO3-31.jpg' },
        { id: 9, category: 'gruesas', name: 'Cintas Gruesas9', description: 'Hermosa Cinta Gruesa', image: 'assets/galeria/MODELO3-32.jpg' },
        { id: 7, category: 'gruesas', name: 'Cintas Gruesas10', description: 'Hermosa Cinta Gruesa', image: 'assets/galeria/MODELO3-33.jpg' },
        { id: 8, category: 'gruesas', name: 'Cintas Gruesas11', description: 'Hermosa Cinta Gruesa', image: 'assets/galeria/MODELO3-35.jpg' },
        { id: 9, category: 'gruesas', name: 'Cintas Gruesas12', description: 'Hermosa Cinta Gruesa', image: 'assets/galeria/MODELO3-36.jpg' },
        { id: 7, category: 'gruesas', name: 'Cintas Gruesas13', description: 'Hermosa Cinta Gruesa', image: 'assets/galeria/MODELO3-38.jpg' },
        { id: 8, category: 'gruesas', name: 'Cintas Gruesas14', description: 'Hermosa Cinta Gruesa', image: 'assets/galeria/MODELO3-40.jpg' },
        { id: 7, category: 'gruesas', name: 'Cintas Gruesas15', description: 'Hermosa Cinta Gruesa', image: 'assets/galeria/MODELO3-1.jpg' },
        { id: 8, category: 'gruesas', name: 'Cintas Gruesas16', description: 'Hermosa Cinta Gruesa', image: 'assets/galeria/MODELO3-2.jpg' },
        
        
        // Rosas 
        { id: 10, category: 'rosas', name: 'Rosas', description: 'Rosas', image: 'assets/galeria/MODELO5 ROSAS.jpg' },
        { id: 11, category: 'rosas', name: 'Otros Diseños', description: 'Otro Diseño', image: 'assets/galeria/MODELO4-1.jpg' },
       
    
    ];
    
    // Si quieres más productos de ejemplo, puedes duplicar estos o añadir más
    // Para 100+ productos, deberías cargarlos desde una base de datos o archivo JSON
}

// Mostrar productos según filtro y página
function displayProducts(filter, page) {
    const galleryGrid = document.getElementById('galleryGrid');
    const noProducts = document.getElementById('noProducts');
    const counter = document.getElementById('counter');
    
    if (!galleryGrid) return;
    
    // Limpiar galería
    galleryGrid.innerHTML = '';
    
    // Filtrar productos
    let filteredProducts = allProducts;
    if (filter !== 'todos') {
        filteredProducts = allProducts.filter(product => product.category === filter);
    }
    
    // Calcular índice de inicio y fin
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    // Mostrar u ocultar mensaje de "no productos"
    if (productsToShow.length === 0 && page === 1) {
        noProducts.style.display = 'block';
    } else {
        noProducts.style.display = 'none';
    }
    
    // Actualizar contador
    if (counter) {
        counter.textContent = Math.min(startIndex + productsToShow.length, filteredProducts.length);
    }
    
    // Mostrar productos
    productsToShow.forEach(product => {
        const productElement = createProductElement(product);
        galleryGrid.appendChild(productElement);
    });
    
    // Mostrar u ocultar botón "Cargar Más"
    const loadMoreBtn = document.getElementById('loadMore');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    if (loadMoreBtn && loadingIndicator) {
        if (endIndex >= filteredProducts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
        
        // Ocultar indicador de carga
        loadingIndicator.style.display = 'none';
    }
    
    // Animar productos
    animateProducts();
}

// Crear elemento de producto
function createProductElement(product) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('data-category', product.category);
    
    const whatsappMessage = encodeURIComponent(`Hola, me interesa este producto: ${product.name} - ${product.description}`);
    const whatsappLink = `https://wa.me/584126624061?text=${whatsappMessage}`;
    
    item.innerHTML = `
        <div class="gallery-item-inner">
            <div class="gallery-img">
                <img src="assets/placeholder.jpg" data-src="${product.image}" alt="${product.name}" loading="lazy" class="loading">
            </div>
            <div class="gallery-overlay">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <a href="${whatsappLink}" target="_blank" class="btn-whatsapp">
                    <i class="fab fa-whatsapp"></i> Consultar por WhatsApp
                </a>
            </div>
        </div>
    `;
    
    return item;
}

// Animar productos al aparecer
function animateProducts() {
    const productItems = document.querySelectorAll('.gallery-item');
    
    productItems.forEach((item, index) => {
        // Retraso escalonado para animación
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 50);
    });
}

// Cargar más productos
function loadMoreProducts() {
    const loadMoreBtn = document.getElementById('loadMore');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    if (loadMoreBtn && loadingIndicator) {
        // Mostrar indicador de carga
        loadMoreBtn.style.display = 'none';
        loadingIndicator.style.display = 'block';
        
        // Simular carga (en producción, esto cargaría más productos del servidor)
        setTimeout(() => {
            currentPage++;
            displayProducts(currentFilter, currentPage);
            
            // Configurar lazy loading para nuevas imágenes
            setupIntersectionObserver();
        }, 800);
    }
}

// Animación inicial para elementos del hero
window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('.hero h1, .hero p, .cta-buttons');
    heroElements.forEach(el => {
        el.style.animationPlayState = 'running';
    });
});