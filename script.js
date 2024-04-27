// Fetch data from the API URL
fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json')
    .then(response => response.json())
    .then(data => {
        // Extract product details from the fetched data
        const product = data.product;
        document.getElementById('product-title').textContent = product.title;
        document.getElementById('product-vendor').textContent = product.vendor;
        document.getElementById('product-price').textContent = `${product.price}.00`;
        document.getElementById('compare-at-price').textContent = `${product.compare_at_price}.00`;

        const price = parseFloat(product.price.slice(1));
        const compareAtPrice = parseFloat(product.compare_at_price.slice(1));
        const percentageOff = Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
        document.getElementById('percentage-off').textContent = percentageOff + '% off';

        const colorSelector = document.getElementById('color-selector');
        product.options.find(option => option.name === 'Color').values.forEach(color => {
            const colorName = Object.keys(color)[0];
            const colorValue = color[colorName];
            console.log(colorValue)
            const colorOption = document.createElement('div');
            colorOption.classList.add("color-represntattion")

            colorOption.style.backgroundColor = colorValue;
           
            colorSelector.appendChild(colorOption);
        });

        //thumbnail 




        const sizeSelector = document.getElementById('size-selector');
        product.options.find(option => option.name === 'Size').values.forEach(size => {
            const sizeOption = document.createElement('div');

            // Create a radio button
            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'size'; // Set the same name for all radio buttons in the group
            radioInput.value = size;
            sizeOption.appendChild(radioInput);

            // Create label for the radio button
            const label = document.createElement('label');
            label.textContent = size;
            sizeOption.appendChild(label);

            sizeSelector.appendChild(sizeOption);
        });



        let minusEl = document.getElementById("minus")
        let plusEl = document.getElementById("plus")
        let valueEl = document.getElementById("value")


        minusEl.addEventListener('click', function() {
            let currentValue = parseInt(valueEl.textContent)
            let newValue = currentValue - 1
            if (newValue <= 1) {
                valueEl.textContent = 1
            } else {
                valueEl.textContent = newValue
            }


        })
        plusEl.addEventListener('click', function() {
            let currentValue = parseInt(valueEl.textContent)
            let newValue = currentValue + 1
            if (newValue <= 1) {
                valueEl.textContent = 1
            } else {
                valueEl.textContent = newValue
            }


        })
        // Assuming you have a function to handle the selection event, let's call it handleSizeSelection


        // Assuming you have an event listener to trigger the function when a selection is made
        // You can attach this event listener after creating the radio buttons


       
        
        const addToCartButton = document.getElementById('add-to-cart');
        addToCartButton.addEventListener('click', () => {
            const addToCartEle = document.getElementById("add-to-cart-message")
            addToCartEle.style.display = "block"
            addToCartEle.textContent = `${product.title} with color Yellow and size ${product}`

            console.log('Product added to cart:', product.title, );
        });

        document.getElementById('product-description').innerHTML = product.description;
        document.getElementById('main-image').src = product.images[0].src;
    })
    .catch(error => console.error('Error fetching data:', error));