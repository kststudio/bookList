class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book){
        const list = document.getElementById('book-list');

        // Create tr element
        const row = document.createElement('tr');

        // Insert cols
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `;

        list.appendChild(row);
    }

    showAlert(message, className){
        // Create a div
        const div = document.createElement('div');
        
        // Add classes
        div.className = `alert ${className}`;

        // Add text
        div.appendChild(document.createTextNode(message));

        // Get the parent
        const container = document.querySelector('.container');

        // Get form
        const form = document.querySelector('#book-form');

        // Insert alert
        container.insertBefore(div, form);

        // Timeout after 3 seconds
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }
    
    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Event Listener for add 
document.getElementById('book-form').addEventListener('submit', function(e){
    // Gets form values from fields
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    // Instantiate book - to create a book object
    const book = new Book(title, author, isbn);

    // Instantiate UI - to create a ui object
    const ui = new UI();

    // Validate
    if(title === '' || author === '' || isbn === ''){
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add book to list
        ui.addBookToList(book);

        // Show alert
        ui.showAlert('Book added!', 'success')

        // Clear fields
        ui.clearFields();
    }

        e.preventDefault();
});

// Event Listener for delete
//this is seperate because of elements that was created after the document loaded
document.getElementById('book-list').addEventListener('click', function(e){
    // Instantiate UI - to create a ui object
    const ui = new UI();

    //Delete book
    ui.deleteBook(e.target);

    // Show alert
    ui.showAlert('Book removed', 'success');

    e.preventDefault();
});
