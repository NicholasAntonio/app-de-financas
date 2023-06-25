
document.addEventListener('DOMContentLoaded',()=>{   

let tempAmount = 0;
let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const productTitle = document.getElementById("product-title");
const totalAmountButton = document.getElementById("amount-button");
const checkAmountButton = document.getElementById("check-amount");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const errorMessage = document.getElementById('budget-error');
const productTitleError = document.getElementById('product-title-error');
const list = document.getElementById('list');

totalAmountButton.addEventListener("click", () => {
    tempAmount = totalAmount.value;
    
    if (tempAmount === "" || tempAmount < 0) {
        errorMessage.classList.remove("hide");
    } else {
        errorMessage.classList.add("hide");
        
        amount.innerHTML = tempAmount;
        balanceValue.innerText = tempAmount - expenditureValue.innerText;
        
        totalAmount.value = "";
    }
});



const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
    });
};



const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpense = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if (edit) {
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true);
    }

    balanceValue.innerText = parseFloat(currentBalance) + parseFloat(parentAmount);
    expenditureValue.innerText = parseFloat(currentExpense) - parseFloat(parentAmount);
    parentDiv.remove();
};



const listCreator = (expenseName, expenseValue) => {
    let subListContent = document.createElement("div");
    subListContent.classList.add("sublist-content", "flex-space");
    list.appendChild(subListContent);
    subListContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
    editButton.style.fontSize = "1.2em";
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true);
    });
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
    deleteButton.style.fontSize = "1.2em";
    deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton);
    });
    subListContent.appendChild(editButton);
    subListContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(subListContent);
};



checkAmountButton.addEventListener("click", () => {
    
    if (!userAmount.value || !productTitle.value) {
        productTitleError.classList.remove("hide");
        return false;
    }else{
        productTitleError.classList.add("hide");
    }
    
    disableButtons(false);
    
    let expenditure = parseFloat(userAmount.value);
    
    let sum = parseFloat(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = sum;
   
    const totalBalance = tempAmount - sum;
    balanceValue.innerText = totalBalance;
    
    listCreator(productTitle.value, userAmount.value);
    
    productTitle.value = "";
    userAmount.value = "";
});

});