document.addEventListener('DOMContentLoaded', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};

    function updateCart() {
        const cartItems = document.getElementById('cart-items');
        if (!cartItems) return; // Avoid null reference error
        cartItems.innerHTML = '';
        let total = 0;

        Object.keys(cart).forEach(itemName => {
            if (cart[itemName].quantity > 0) {
                const li = document.createElement('li');
                li.textContent = `${itemName} - ${cart[itemName].quantity} x ${cart[itemName].price} = ${cart[itemName].quantity * cart[itemName].price} rupees`;

                const quantitySpan = document.createElement('span');
                quantitySpan.textContent = ` Quantity: ${cart[itemName].quantity} `;

                const removeButton = document.createElement('button');
                removeButton.textContent = '-';
                removeButton.addEventListener('click', () => {
                    cart[itemName].quantity -= 1;
                    if (cart[itemName].quantity === 0) {
                        delete cart[itemName];
                    }
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCart();
                });

                const addButton = document.createElement('button');
                addButton.textContent = '+';
                addButton.addEventListener('click', () => {
                    cart[itemName].quantity += 1;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCart();
                });

                li.appendChild(removeButton);
                li.appendChild(quantitySpan);
                li.appendChild(addButton);
                cartItems.appendChild(li);

                total += cart[itemName].quantity * cart[itemName].price;
            }
        });

        const totalLi = document.createElement('li');
        totalLi.textContent = `Total: ${total} rupees`;
        cartItems.appendChild(totalLi);
    }

    const confirmOrderButton = document.getElementById('confirm-order');
    confirmOrderButton.addEventListener('click', () => {
        const cartSummary = Object.keys(cart).map(itemName => {
            return { name: itemName, quantity: cart[itemName].quantity, price: cart[itemName].price };
        });

        const total = cartSummary.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        const customerName = document.getElementById('customer-name').value;

        if (!customerName) {
            alert('Please enter your name.');
            return;
        }

        fetch('http://localhost:3000/submit-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ customerName, items: cartSummary, total })
        }).then(response => {
            if (response.ok) {
                location.href = 'order-success.html'; // Redirect to the success page
            } else {
                alert('Error confirming order');
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    });

    const backToMenuButton = document.getElementById('back-to-menu');
    backToMenuButton.addEventListener('click', () => {
        location.href = 'index.html';
    });

    updateCart();
});
