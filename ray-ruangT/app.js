const openSidebar = document.getElementById('openSidebar');
const closeSidebar = document.getElementById('closeSidebar');
const sidebarMenu = document.getElementById('sidebarMenu');
const cartButton = document.getElementById('cartButton');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');

let cart = [];

// Produk contoh
const products = [
  { id: 1, name: "Baju Oversize", price: 120000, image: "images/1.jpg" },
  { id: 2, name: "Kaos Polos", price: 90000, image: "images/2.jpg" },
  { id: 3, name: "Hoodie Tebal", price: 200000, image: "images/3.jpg" }
];

const productContainer = document.getElementById('productContainer');

// Render produk
function renderProducts() {
  productContainer.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Rp ${product.price.toLocaleString()}</p>
      <select class="size-select" id="size-${product.id}">
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>
      <button class="add-cart-btn" onclick="addToCart(${product.id})">
        <i class="ri-shopping-cart-2-line"></i> Tambah
      </button>
    `;
    productContainer.appendChild(card);
  });
}

// Tambahkan ke keranjang
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const size = document.getElementById(`size-${id}`).value;
  cart.push({ ...product, size });
  updateCart();
}

// Update tampilan keranjang
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <p>${item.name} (${item.size}) - Rp ${item.price.toLocaleString()}</p>
      <button onclick="removeFromCart(${index})">Hapus</button>
    `;
    cartItems.appendChild(div);
  });
  cartCount.textContent = cart.length;
  cartTotal.textContent = `Rp ${total.toLocaleString()}`;
}

// Hapus item
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Event listener
openSidebar.addEventListener('click', () => {
  sidebarMenu.classList.add('active');
  overlay.classList.add('active');
});

closeSidebar.addEventListener('click', () => {
  sidebarMenu.classList.remove('active');
  overlay.classList.remove('active');
});

cartButton.addEventListener('click', () => {
  cartSidebar.classList.add('active');
  overlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
  cartSidebar.classList.remove('active');
  overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
  sidebarMenu.classList.remove('active');
  cartSidebar.classList.remove('active');
  overlay.classList.remove('active');
});

renderProducts();
