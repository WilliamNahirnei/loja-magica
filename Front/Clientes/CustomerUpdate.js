import { updateCustomerApi, getCustomerById } from "/Front/Api/CustomerApi.js"
export function constructUpdateForm(customerData, idContainer, registerTable) {
    const idCustomer = customerData.id;

    // Carregar o arquivo HTML usando fetch
    fetch('/Front/Clientes/updateForm.php')
        .then(response => response.text())  // Obtém o conteúdo HTML do arquivo
        .then(html => {
            // Criar o contêiner e inserir o HTML
            let formContainer = document.getElementById(idContainer);

            // Inserir o conteúdo HTML no contêiner
            formContainer.insertAdjacentHTML('afterbegin', html);
            // Preencher os campos do formulário com os dados do cliente
            document.getElementById("inputName").value = customerData.customerName ?? "";
            document.getElementById("inputEmail").value = customerData.customerEmail ?? "";
            document.getElementById("inputLocation").value = customerData.customerLocation ?? "";

            // Adicionar eventos aos botões de ação
            document.getElementById("updateButton").addEventListener("click", function () {
                updateCustomer(idCustomer);
                document.getElementById("updateForm").remove();
                if (registerTable != null) {
                    registerTable.remountTableAfterAction()
                }
            });

            document.getElementById("cancelButton").addEventListener("click", function () {
                document.getElementById("updateForm").remove();
            });
        })
        .catch(error => {
            alert('Erro ao carregar o formulário:');
        });
}

function updateCustomer(idCustomer) {
    const name = document.getElementById("inputName").value;
    const email = document.getElementById("inputEmail").value;
    const location = document.getElementById("inputLocation").value;

    const customerData = {
        name,
        email,
        location
    }

    const response = updateCustomerApi(idCustomer, customerData);
    const responseData = response.data;
}