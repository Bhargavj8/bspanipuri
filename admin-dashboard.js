document.addEventListener('DOMContentLoaded', function () {
    const orderList = document.getElementById('order-list');

    function fetchOrders() {
        fetch('http://localhost:3000/orders')
            .then(response => response.json())
            .then(orders => {
                displayOrders(orders);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }

    function displayOrders(orders) {
        orderList.innerHTML = '';

        orders.forEach(order => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div><strong>Customer:</strong> ${order.customerName}</div>
                <div><strong>Items:</strong></div>
                <ul>
                    ${order.items.map(item => `<li>${item.name} (${item.quantity})</li>`).join('')}
                </ul>
                <div><strong>Total:</strong> ${order.total} rupees</div>
            `;

            const markCompletedButton = document.createElement('button');
            markCompletedButton.textContent = 'Mark as Completed';
            markCompletedButton.addEventListener('click', () => {
                updateOrderStatus(order._id, 'Completed');
            });

            li.appendChild(markCompletedButton);
            orderList.appendChild(li);
        });
    }

    function updateOrderStatus(orderId, status) {
        fetch(`http://localhost:3000/orders/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        }).then(response => {
            if (response.ok) {
                fetchOrders();
            } else {
                alert('Error updating order status');
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    }

    fetchOrders();
});
