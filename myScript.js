function BuscaCEP(){
    
    // Criação dos observables
    self = this;
    self.cep = ko.observable('');
    self.logradouro = ko.observable('');
    self.bairro = ko.observable('');
    self.cidade = ko.observable('');
    self.uf = ko.observable('');
    self.numero = ko.observable('');
    self.complemento = ko.observable('');

    // Campo de erro do cep
    self.CepValido = ko.observable(false);
    self.CepErrorMessage = ko.observable('');
    console.log("test1");
    self.ValidateCep = function () {
        console.log("test2");
        self.CepValido(true);
        self.CepErrorMessage('');

        //Verifica se CEP tem tamanho de 8 digitos
        var cep =  self.cep();
        var validacep = /^[0-9]{8}$/;

        // Caso CEP esteja valido
        if (validacep.test(cep)) {
            $.getJSON("https://viacep.com.br/ws/" + self.cep() + "/json/", function(endereco) {
                if (!("erro" in endereco)) {
                    // Seta dados recebidos da API para os observables 
                    self.logradouro(endereco.logradouro);
                    self.bairro(endereco.bairro);
                    self.cidade(endereco.localidade);
                    self.uf(endereco.uf);
                }
                // Caso CEP não existe na base dos Correios
                else 
                {
                    LimpaForm('CEP não encontrado');
                }
            })
        }
        // Caso CEP inválido
        else
        {
            LimpaForm('CEP inválido');
        }
    }
}

// Função para limpar o form passando a mensagem de erro
function LimpaForm(value)
{
    self.CepValido(false);
    self.CepErrorMessage(value); // Escreve a mensagem recebida
    // Preenche os campos com vazio
    self.logradouro(''); 
    self.bairro('');
    self.cidade('');
    self.uf('');
}
ko.applyBindings(new BuscaCEP());