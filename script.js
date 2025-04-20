document.getElementById("processBtn").addEventListener("click", () => {
    const fileInput = document.getElementById("fileInput");
    const status = document.getElementById("status");

    if (fileInput.files.length === 0) {
        alert("Por favor, selecione uma imagem!");
        return;
    }

    const imageFile = fileInput.files[0];

    status.innerText = "Processando imagem...";

    Tesseract.recognize(
        imageFile,
        'por', // Idioma português
        {
            logger: info => console.log(info)
        }
    ).then(({ data: { text } }) => {
        status.innerText = "Preenchendo campos...";
        const extractedData = extractFields(text);

        // Preencher campos automaticamente (exemplo)
        document.querySelector("#nome").value = extractedData.nome;
        document.querySelector("#dataNascimento").value = extractedData.dataNascimento;
        document.querySelector("#cpf").value = extractedData.cpf;
        document.querySelector("#endereco").value = extractedData.endereco;
        document.querySelector("#cep").value = extractedData.cep;
        document.querySelector("#telefone").value = extractedData.telefone;
        document.querySelector("#email").value = extractedData.email;

        status.innerText = "Cadastro concluído!";
    }).catch(err => {
        console.error(err);
        alert("Erro ao processar a imagem!");
    });
});

// Função para extrair campos específicos do texto reconhecido
function extractFields(text) {
    const fields = {
        nome: /Nome:\s*(.*)/i.exec(text)?.[1] || "",
        dataNascimento: /Data de Nascimento:\s*(.*)/i.exec(text)?.[1] || "",
        cpf: /CPF:\s*(.*)/i.exec(text)?.[1] || "",
        endereco: /Endereço:\s*(.*)/i.exec(text)?.[1] || "",
        cep: /CEP:\s*(.*)/i.exec(text)?.[1] || "",
        telefone: /Telefone:\s*(.*)/i.exec(text)?.[1] || "",
        email: /Email:\s*(.*)/i.exec(text)?.[1] || "",
    };
    return fields;
}
