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


type_print("\nEnunciado da Questão 7 – Caso 7 (índice de nobreza ponderado 1,2,3)\n Crie um índice de 'nobreza' do mix de produção: Básico=1, Luxo=2, Requinte=3. \nCalcule os indices de Mogno e Cerejeira por multiplicação matricial e monte uma matriz 3x3. \nCalcule o determinante via cofatores de Laplace. \nTarefas específicas: \nDefina w = [1,2,3]. \nCalcule indice_mogno = P_mogno·w e indice_cerejeira = P_cerejeira·w. \nMonte A7: \nAA7 = [[indice_mogno, indice_cerejeira, soma], \n[fech_mogno, fech_cerejeira, fech_total], \n[1,2,3]] \nCalcule det(A7) por Laplace. \n(implementação Python e validação com numpy.linalg.det opcional)\n")


# A7 (AA7 nomenclatura) será exibida como modelo antes dos cálculos
# mostrando sua estrutura com efeito de digitação.

type_print("AA7 = [[indice_mogno, indice_cerejeira, soma],")
type_print("      [fech_mogno, fech_cerejeira, fech_total],")
type_print("      [1, 2, 3]]\n")
time.sleep(12) # pausa para permitir que o leitor absorva a estrutura da matriz A7 antes de começarmos a preenchê-la com os valores calculados. Essa pausa é importante para criar um ritmo adequado na apresentação, evitando que as informações sejam apresentadas muito rapidamente e permitindo que o leitor compreenda cada etapa do processo de construção da matriz antes de avançar para os cálculos dos índices e fechamentos. O tempo de 12 segundos é uma sugestão, mas pode ser ajustado conforme necessário para se adequar ao ritmo da apresentação ou ao nível de familiaridade do público com o conteúdo.

# A7 ainda não pode ser montada aqui porque os índices não existem antes de serem calculados.
# ela será construída após calcularmos indice_mogno, indice_cerejeira e os fechamentos.


base_1 = [
    ["modelo_madeira", "basico", "luxo", "requinte"],
    ["mogno", 3, 5, 4],
    ["cerejeira", 4, 3, 5]
]

# mostrar as tabelas iniciais com efeito de digitação

type_print("Tabela base_1:")
for row in base_1:
    type_print("\t".join(str(x) for x in row))


base_2 = [
    ["madeira_tipo", "mogno", "cerejeira"],
    ["dourado", 10, 12],
    ["prateado", 8, 8],
    ["bronzeado", 4, 6]
]

type_print("\nTabela base_2:")
for row in base_2:
    type_print("\t".join(str(x) for x in row))


print("\nbase_1:")
for row in base_1:
    print("\t".join(str(x) for x in row))
print("\nbase_2:")
for row in base_2:
    print("\t".join(str(x) for x in row))

time.sleep(12)

# construindo a matriz
# o enunciado diz que os pesos são 1, 2 e 3 para básico, luxo e requinte respectivamente 

# o que temos até agora é o A7 montado dessa forma, apenas com a última linha preenchida, o que é necessário para calcular o determinante por cofatores de Laplace, precisamos descobrir os índices de nobreza para mogno e cerejeira, e a soma desses índices para preencher a primeira linha da matriz A7, e também precisamos preencher a segunda linha com os valores de fechamento para mogno, cerejeira e o total.

#a7 = [
 #   ["indice_mogno", "indice_cerejeira", "soma"],
  #  ["fech_mogno", "fech_cerejeira", "fech_total"],
   # [1, 2, 3]
#] 

# descobrindo o valor do indice mogno

indice_mogno = (
    base_1[1][1] * 1 +
    base_1[1][2] * 2 +
    base_1[1][3] * 3
)
type_print(f"\ncalculando indice_mogno = {indice_mogno}")

# descobrindo o valor do indice cerejeira

indice_cerejeira = (
    base_1[2][1] * 1 +
    base_1[2][2] * 2 +
    base_1[2][3] * 3
)
type_print(f"calculando indice_cerejeira = {indice_cerejeira}")

# descobrindo o valor da soma dos índices (soma)

soma = indice_mogno + indice_cerejeira
type_print(f"soma dos índices = {soma}")
time.sleep(12)

#agora temos a linha 1 da matriz A7 preenchida, agora precisamos preencher a linha 2 com os valores de fechamento para mogno, cerejeira e o total.

type_print("\nlinha 1 completa: " + str([indice_mogno, indice_cerejeira, soma]))
type_print("linha 2 ainda será preenchida com valores de fechamento")
type_print("linha 3 completa: " + str([1, 2, 3]) + "\n")
time.sleep(12)

# vamos em busca da linha 2 agora.
# descobrindo o valor do fechamento para mogno, que é a soma dos valores de cada tipo de acabamento para mogno




fech_mogno = (
    base_2[1][1] +
    base_2[2][1] +
    base_2[3][1]
)
type_print(f"\nfech_mogno calculado = {fech_mogno}")

# descobrindo o valor do fechamento para cerejeira, que é a soma dos valores de cada tipo de acabamento para cerejeira
fech_cerejeira = (
    base_2[1][2] +
    base_2[2][2] +
    base_2[3][2]
)
type_print(f"fech_cerejeira calculado = {fech_cerejeira}")

# descobrindo o valor do fechamento total, soma de todos os valores numéricos da tabela
fech_total = sum(
    base_2[i][j]
    for i in range(1, len(base_2))
    for j in range(1, len(base_2[i]))
)
type_print(f"fech_total calculado = {fech_total}")
time.sleep(12)

print()
type_print("\nlinha 1 completa: " + str([indice_mogno, indice_cerejeira, soma]))
type_print("linha 2 completa: " + str([fech_mogno, fech_cerejeira, fech_total]))
type_print("linha 3 completa: " + str([1, 2, 3]))
time.sleep(12)

# temos a matriz a7 completa :D
a7 = [
    [indice_mogno, indice_cerejeira, soma],
    [fech_mogno, fech_cerejeira, fech_total],
    [1, 2, 3]
]

type_print("\nMatriz A7 montada:")
for row in a7:
    # imprime cada linha de A7 com separador de tabulação para visualização
    print("\t".join(str(x) for x in row))
print()
time.sleep(12)

# função para determinante 3x3 por Laplace (cofatores)
def det3(mat):
    # desestrutura as três linhas da matriz 3x3
    a, b, c = mat[0]
    d, e, f = mat[1]
    g, h, i = mat[2]
    # aplica a fórmula do determinante usando cofatores:
    # a·(e·i - f·h) - b·(d·i - f·g) + c·(d·h - e·g)
    return a*(e*i - f*h) - b*(d*i - f*g) + c*(d*h - e*g)

# calcula o determinante manualmente
determinante = det3(a7)
type_print("Calculando determinante por Laplace...")
time.sleep(12)

type_print(f"determinante (Laplace): {determinante}")

# verifica se a matriz é singular (determinante zero) ou invertível
if determinante == 0:
    type_print("Resultado: A7 é singular (não invertível)")
else:
    type_print("Resultado: A7 é invertível")

# validação com numpy
try:
    # numpy.linalg.det calcula o determinante de forma confiável
    # converte A7 em array NumPy antes de chamar a função
    det_np = round(np.linalg.det(np.array(a7)))
    type_print(f"determinante (numpy): {det_np}")
except Exception:
    # caso numpy falhe (não instalado ou outro erro), apenas ignora
    pass
