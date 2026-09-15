// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const cartIcon = document.querySelector('.cart-icon');
const wishlistIcon = document.querySelector('.wishlist-icon');
const productsContainer = document.getElementById('products-container');
const bestSellersContainer = document.getElementById('best-sellers-container');
const newsletterForm = document.getElementById('newsletter-form');
const notification = document.createElement('div');

// State
let cartCount = 0;
let wishlistCount = 0;
let wishlistItems = [];

// Sample product data
const products = [
    {
        id: 1,
        name: "Premium Hoodie",
        category: "Men",
        price: 89.99,
        image: "images/hoodie.jpg"
    },
    {
        id: 2,
        name: "Designer Jeans",
        category: "Women",
        price: 129.99,
        image: "images/jeans.jpg"
    },
    {
        id: 3,
        name: "Street Sneakers",
        category: "Unisex",
        price: 149.99,
        image: "images/sneakers.jpg"
    },
    {
        id: 4,
        name: "Leather Jacket",
        category: "Men",
        price: 299.99,
        image: "images/jacket.jpg"
    },
    {
        id: 5,
        name: "Designer T-Shirt",
        category: "Women",
        price: 49.99,
        image: "images/tshirt.jpg"
    },
    {
        id: 6,
        name: "Accessories Set",
        category: "Accessories",
        price: 79.99,
        image: "images/accessories.jpg"
    }
];

const bestSellers = [
    {
        id: 7,
        name: "Classic Sweater",
        category: "Women",
        price: 99.99,
        image: "images/sweater.jpg"
    },
    {
        id: 8,
        name: "Casual Shorts",
        category: "Men",
        price: 59.99,
        image: "images/shorts.jpg"
    },
    {
        id: 9,
        name: "Designer Hat",
        category: "Accessories",
        price: 39.99,
        image: "images/cap.jpg"
    },
    {
        id: 10,
        name: "Premium Pants",
        category: "Unisex",
        price: 119.99,
        image: "images/jeans.jpg"
    }
];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(productsContainer, products);
    renderProducts(bestSellersContainer, bestSellers);
    
    // Set up event listeners
    setupEventListeners();
    
    // Add notification styles
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
});

// Set up event listeners
function setupEventListeners() {
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
        });
    });
    
    // Cart functionality
    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Item added to cart!');
    });
    
    // Wishlist functionality
    wishlistIcon.addEventListener('click', function(e) {
        e.preventDefault();
        wishlistCount++;
        wishlistIcon.setAttribute('data-count', wishlistCount);
        showNotification('Item added to wishlist!');
    });
    
    // Newsletter form
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        if (isValidEmail(email)) {
            showNotification('Thank you for subscribing!');
            this.reset();
        } else {
            showNotification('Please enter a valid email address.');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Render products to the DOM
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
                <p class="product-price">$${product.price.toFixed(2)}</p>
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
    
    // Add event listeners to new buttons
    document.querySelectorAll('.wishlist-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            toggleWishlist(productId);
        });
    });
    
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Add to cart function
function addToCart(productId) {
    cartCount++;
    cartIcon.setAttribute('data-count', cartCount);
    
    // Visual feedback
    cartIcon.style.color = '#e74c3c';
    
    // Reset color after animation
    setTimeout(() => {
        cartIcon.style.color = '#000';
    }, 500);
    
    showNotification('Item added to cart!');
}

// Toggle wishlist function
function toggleWishlist(productId) {
    const index = wishlistItems.indexOf(productId);
    
    if (index === -1) {
        wishlistItems.push(productId);
        wishlistCount++;
        wishlistIcon.setAttribute('data-count', wishlistCount);
        showNotification('Item added to wishlist!');
    } else {
        wishlistItems.splice(index, 1);
        wishlistCount--;
        wishlistIcon.setAttribute('data-count', wishlistCount);
        showNotification('Item removed from wishlist!');
    }
}

// Show notification function
function showNotification(message) {
    notification.textContent = message;
    notification.style.opacity = '1';
    
    setTimeout(() => {
        notification.style.opacity = '0';
    }, 3000);
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
