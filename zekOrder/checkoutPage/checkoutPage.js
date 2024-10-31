document.querySelectorAll('.cart-item').forEach(item => {
    const quantityElem = item.querySelector('.quantity');
    const plusBtn = item.querySelector('.plus');
    const minusBtn = item.querySelector('.minus');
    const deleteBtn = item.querySelector('.delete'); // Select the trash button
    const pricePerItem = 200;

    let quantity = 0;

    plusBtn.addEventListener('click', () => {
        quantity++;
        quantityElem.textContent = quantity < 10 ? '0' + quantity : quantity;
        updateTotals();
    });

    minusBtn.addEventListener('click', () => {
        if (quantity > 0) {
            quantity--;
            quantityElem.textContent = quantity < 10 ? '0' + quantity : quantity;
            updateTotals();
        }
    });

    deleteBtn.addEventListener('click', () => {
        quantity = 0; // Reset quantity to 0
        quantityElem.textContent = '00';
        updateTotals();
    });

    function updateTotals() {
        let subtotal = Array.from(document.querySelectorAll('.cart-item')).reduce((total, item) => {
            const itemQuantity = parseInt(item.querySelector('.quantity').textContent, 10);
            return total + (itemQuantity * pricePerItem);
        }, 0);

        const tax = subtotal * 0.10; // Calculate 10% tax
        const total = subtotal + tax;

        document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
        document.getElementById('total').textContent = `₹${total.toFixed(2)}`;
    }
});
