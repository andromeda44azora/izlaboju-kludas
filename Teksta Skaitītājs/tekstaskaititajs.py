skaitisanas_vardnica = {}
testa_dati = []

with open("VarduSkaititajs/teksts.txt", "r", encoding="utf-8") as f:
    for rinda in f:
        dati = rinda.split(" ")
        for vards in dati:
            vards.strip(".,()[$@&%:!?:;\n \"")
            vards.lower()
            if len(vards) > 3:
                testa_dati.append(vards.lower())

lielakais = ""
lielaka_vertiba = 0

#for vards in testa_dati:
#    if vards in skaitisanas_vardnica.keys():
#        skaitisanas_vardnica[vards] += 1
#    else:
#        skaitisanas_vardnica[vards] = 1

for vards in testa_dati:
    if vards in skaitisanas_vardnica.keys():
        skaitisanas_vardnica[vards]+=1
    else:
        skaitisanas_vardnica[vards]=1


kartota_skaitisanas_vardnica = sorted(skaitisanas_vardnica.items(), key=lambda x: x[1], reverse=True)[:5]

for atslega, vertiba in kartota_skaitisanas_vardnica:
    print(atslega, ": ", vertiba)