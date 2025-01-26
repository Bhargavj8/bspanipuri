document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('ul li');
    const cart = {};

    menuItems.forEach(item => {
        const addButton = item.querySelector('.add-initial');
        const controlButtons = item.querySelector('.control-buttons');
        const removeButton = item.querySelector('.remove');
        const incrementButton = item.querySelector('.add');
        const quantitySpan = item.querySelector('.quantity');
        const itemDetails = item.querySelector('.item-details').textContent.trim();
        const itemName = itemDetails.split('-')[0].trim();
        const itemPrice = parseInt(itemDetails.split('-')[1].trim(), 10);

        addButton.addEventListener('click', () => {
            addButton.style.display = 'none';
            controlButtons.style.display = 'flex';
            if (!cart[itemName]) {
                cart[itemName] = { quantity: 0, price: itemPrice };
            }
            cart[itemName].quantity += 1;
            updateQuantityDisplay(quantitySpan, cart[itemName].quantity);
            updateCart();
        });

        removeButton.addEventListener('click', () => {
            if (cart[itemName] && cart[itemName].quantity > 0) {
                cart[itemName].quantity -= 1;
                updateQuantityDisplay(quantitySpan, cart[itemName].quantity);
                if (cart[itemName].quantity === 0) {
                    controlButtons.style.display = 'none';
                    addButton.style.display = 'inline-block';
                }
                updateCart();
            }
        });

        incrementButton.addEventListener('click', () => {
            cart[itemName].quantity += 1;
            updateQuantityDisplay(quantitySpan, cart[itemName].quantity);
            updateCart();
        });
    });

    function updateQuantityDisplay(span, quantity) {
        span.textContent = quantity;
    }

    function updateCart() {
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';
        let total = 0;

        Object.keys(cart).forEach(itemName => {
            if (cart[itemName].quantity > 0) {
                const li = document.createElement('li');
                li.textContent = `${itemName} - ${cart[itemName].quantity} x ${cart[itemName].price} = ${cart[itemName].quantity * cart[itemName].price} rupees`;
                cartItems.appendChild(li);
                total += cart[itemName].quantity * cart[itemName].price;
            }
        });

        const totalLi = document.createElement('li');
        totalLi.textContent = `Total: ${total} rupees`;
        cartItems.appendChild(totalLi);
    }

    const goToCartButton = document.getElementById('go-to-cart');
    goToCartButton.addEventListener('click', () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        location.href = 'cart.html';
    });

    const confirmOrderButton = document.getElementById('confirm-order');
    confirmOrderButton.addEventListener('click', () => {
        const cartSummary = Object.keys(cart).map(itemName => {
            return `${itemName}: ${cart[itemName].quantity} x ${cart[itemName].price}`;
        }).join('\n');
        alert(`Order confirmed:\n${cartSummary}`);
        console.log('Order confirmed:', cart);
        // Add your logic to send the order to the server or admin here
    });
});
