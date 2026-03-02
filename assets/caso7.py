# Enunciado da Questão 7 – Caso 7 (índice de nobreza ponderado 1,2,3):
# Crie um índice de 'nobreza' do mix de produção: Básico=1, Luxo=2, Requinte=3.
# Calcule os indices de Mogno e Cerejeira por multiplicação matricial e monte uma
# matriz 3x3.
# Calcule o determinante via cofatores de Laplace.
#
# Tarefas específicas:
# - Defina w = [1,2,3].
# - Calcule indice_mogno = P_mogno·w e indice_cerejeira = P_cerejeira·w.
# - Monte A7:
#     AA7 = [[indice_mogno, indice_cerejeira, soma],
#           [fech_mogno, fech_cerejeira, fech_total],
#           [1,2,3]]
# - Calcule det(A7) por Laplace.
# (implementação Python e validação com numpy.linalg.det opcional)

#samia & yara os comentarios são pra voces, se quiserem podem apagar depois, ou deixar pra ajudar a entender o raciocínio, o que acharem melhor :D

# os valores para construir a matriz

import numpy as np # para validação do determinante, não é obrigatório, mas é uma boa prática validar os resultados de cálculos manuais com bibliotecas confiáveis, e o numpy é uma das mais utilizadas para operações matriciais em Python. Se preferirem, podem deixar essa parte de validação comentada ou removida, o importante é que o cálculo manual do determinante por Laplace esteja correto e bem explicado.  


import time # para criar o efeito de digitação, tornando a apresentação mais dinâmica e envolvente. A função type_print é uma maneira simples de simular esse efeito, imprimindo cada caractere com um pequeno atraso. Isso pode ajudar a manter o interesse do leitor e tornar a explicação mais clara, especialmente em um contexto educacional ou de apresentação.


def type_print(s, delay=0.04): # função para imprimir com efeito de digitação, tornando a apresentação mais dinâmica e envolvente. O delay padrão é de 0.07 segundos entre cada caractere, mas pode ser ajustado conforme necessário. 
    for ch in str(s): # iterar sobre cada caractere na string e imprimir um por um, com um pequeno atraso entre eles. O argumento flush=True garante que a saída seja exibida imediatamente, sem esperar por um buffer, o que é importante para criar o efeito de digitação de forma eficaz.
        print(ch, end="", flush=True) # imprimir o caractere atual sem adicionar uma nova linha (end="") e garantir que a saída seja exibida imediatamente (flush=True) para criar o efeito de digitação.
        time.sleep(delay) # adicionar um pequeno atraso entre a impressão de cada caractere para simular o efeito de digitação. O valor do delay pode ser ajustado para tornar a digitação mais rápida ou mais lenta, dependendo da preferência do apresentador ou do ritmo desejado para a apresentação.
    print()  # adicionar uma nova linha após imprimir toda a string, garantindo que a próxima saída comece em uma nova linha, mantendo a formatação adequada do console.

# (resto do código continua igual...)
