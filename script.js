// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const wishlistIcons = document.querySelectorAll('.wishlist-icon');
const cartIcon = document.querySelector('.cart-icon');
const newsletterForm = document.getElementById('newsletter-form');
const productsContainer = document.getElementById('products-container');
const bestSellersContainer = document.getElementById('best-sellers-container');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Wishlist functionality
wishlistIcons.forEach(icon => {
    icon.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.toggle('active');
        
        // Update wishlist count
        const count = parseInt(this.getAttribute('data-count') || 0);
        this.setAttribute('data-count', count === 0 ? 1 : 0);
        
        // Visual feedback
        this.style.color = this.classList.contains('active') ? '#e74c3c' : '#000';
    });
});

// Cart functionality
let cartCount = 0;
cartIcon.addEventListener('click', function(e) {
    e.preventDefault();
    cartCount++;
    this.setAttribute('data-count', cartCount);
    
    // Visual feedback
    this.style.color = '#e74c3c';
    
    // Reset color after animation
    setTimeout(() => {
        this.style.color = '#000';
    }, 500);
});

// Add to Cart functionality
function addToCart(productId) {
    cartCount++;
    cartIcon.setAttribute('data-count', cartCount);
    
    // Visual feedback
    cartIcon.style.color = '#e74c3c';
    
    // Reset color after animation
    setTimeout(() => {
        cartIcon.style.color = '#000';
    }, 500);
    
    // Show notification
    showNotification(`Added to cart: Product ${productId}`);
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#000';
    notification.style.color = '#fff';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s ease';
    
    document.body.appendChild(notification);
    
    // Fade in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Newsletter form validation
newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    // Simple email validation
    if (!email || !isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Show success message
    showNotification('Thank you for subscribing!');
    
    // Reset form
    this.reset();
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Product data
const products = [
    {
        id: 1,
        name: "Premium Hoodie",
        category: "Men",
        price: "$129.99",
        image: "https://images.unsplash.com/photo-1521572163474-6c03d3937509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Designer Jacket",
        category: "Women",
        price: "$249.99",
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Street Sneakers",
        category: "Accessories",
        price: "$159.99",
        image: "https://images.unsplash.com/photo-1591047139853-5870f3d5d1a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Luxury T-Shirt",
        category: "Men",
        price: "$79.99",
        image: "https://images.unsplash.com/photo-1525507119028-75740b2b0f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Designer Jeans",
        category: "Women",
        price: "$139.99",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Premium Cap",
        category: "Accessories",
        price: "$49.99",
        image: "https://images.unsplash.com/photo-1591047139853-5870f3d5d1a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "Designer Sweater",
        category: "Women",
        price: "$179.99",
        image: "https://images.unsplash.com/photo-1521572163474-6c03d3937509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "Street Shorts",
        category: "Men",
        price: "$89.99",
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    }
];

// Best sellers data
const bestSellers = [
    {
        id: 9,
        name: "Classic Leather Jacket",
        category: "Men",
        price: "$299.99",
        image: "https://images.unsplash.com/photo-1525507119028-75740b2b0f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 10,
        name: "Designer Blouse",
        category: "Women",
        price: "$149.99",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 11,
        name: "Premium Backpack",
        category: "Accessories",
        price: "$129.99",
        image: "https://images.unsplash.com/photo-1591047139853-5870f3d5d1a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 12,
        name: "Luxury Polo Shirt",
        category: "Men",
        price: "$99.99",
        image: "https://images.unsplash.com/photo-1521572163474-6c03d3937509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    }
];

// Render products
function renderProducts(container, productArray) {
    container.innerHTML = '';
    
    productArray.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-price">${product.price}</p>
                <div class="product-actions">
                    <button class="wishlist-btn" data-id="${product.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="add-to-cart-btn" data-id="${product.id}">
                        <i class="fas fa-shopping-bag"></i>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(productCard);
    });
    
    // Add event listeners to wishlist buttons
    document.querySelectorAll('.wishlist-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = this.getAttribute('data-id');
            const icon = this.querySelector('i');
            icon.classList.toggle('fas');
            icon.classList.toggle('far');
            
            // Visual feedback
            this.style.color = icon.classList.contains('fas') ? '#e74c3c' : '#000';
        });
    });
    
    // Add event listeners to add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = this.getAttribute('data-id');
            addToCart(productId);
        });
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Render products
    renderProducts(productsContainer, products);
    renderProducts(bestSellersContainer, bestSellers);
    
    // Smooth scrolling for anchor links
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
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
});
