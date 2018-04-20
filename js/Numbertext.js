

var modules={}
<!-- **************************************************************************************************** -->
modules['Hung']=`
# Szekler-Hungarian Rovásírás (Old Hungarian, ISO 15924: Hung)
1:(.*):(.*) \1
2:(.*):(.*) \1\1
3:(.*):(.*) \1\1\1
4:(.*):(.*) \1\1\1\1
5:(.*):(.*) \2
6:(.*):(.*) \1\2
7:(.*):(.*) \1\1\2
8:(.*):(.*) \1\1\1\2
9:(.*):(.*) \1\1\1\1\2

(\d) $(\1:𐳺:𐳻)
(\d)(\d) $2$(\1:𐳼:𐳽)
1(\d\d) $1𐳾
(\d)(\d\d) $2𐳾$1
1(\d\d\d)$ $1𐳿
(\d{1,3})(\d\d\d) $2𐳿$1
1(\d{6})$ $1𐳿𐳿
(\d{1,3})(\d{6}) $2𐳿𐳿$1
1(\d{9})$ $1𐳿𐳿𐳿
(\d{1,3})(\d{9}) $2𐳿𐳿𐳿$1

== left-to-right ==

1:(.*):(.*) \1
2:(.*):(.*) \1\1
3:(.*):(.*) \1\1\1
4:(.*):(.*) \1\1\1\1
5:(.*):(.*) \2
6:(.*):(.*) \2\1
7:(.*):(.*) \2\1\1
8:(.*):(.*) \2\1\1\1
9:(.*):(.*) \2\1\1\1\1

(\d) $(left-to-right \1:𐳺:𐳻)
(\d)(\d) $(left-to-right \1:𐳼:𐳽)$(left-to-right \2)
1(\d\d) 𐳾$(left-to-right \1)
(\d)(\d\d) $(left-to-right \1)𐳾$(left-to-right \2)
1(\d\d\d)$ 𐳿$(left-to-right \1)
(\d{1,3})(\d\d\d) $(left-to-right \1)𐳿$(left-to-right \2)
1(\d{6})$ 𐳿𐳿$(left-to-right \1)
(\d{1,3})(\d{6}) $(left-to-right \1)𐳿𐳿$(left-to-right \2)
1(\d{9})$ 𐳿𐳿𐳿$(left-to-right \1)
(\d{1,3})(\d{9}) $(left-to-right \1)𐳿𐳿𐳿$(left-to-right \2)
`
modules['Roman']=`
# Roman numbers
1:(.)(.)(.) \1
2:(.)(.)(.) \1\1
3:(.)(.)(.) \1\1\1
4:(.)(.)(.) \1\2
5:(.)(.)(.) \2
6:(.)(.)(.) \2\1
7:(.)(.)(.) \2\1\1
8:(.)(.)(.) \2\1\1\1
9:(.)(.)(.) \1\3

(\d) $(\1:IVX)
(\d)(\d) $(\1:XLC)$2
(\d)(\d\d) $(\1:CDM)$2

# ([123])(\d\d\d) $(\1:Mxx)$2
# (\d+)(\d\d\d) \($1\)$2

([123])(\d\d\d) $(\1:M--)$2
([123]\d{3})(\d\d\d) $(overline $1)$2		# overline: ×1000
(\d{1,3})(\d\d\d) $(overline $1)$2		# overline: ×1000
([123]\d{3})(\d{5}) \|$(overline $1)\|$2	# bar: ×100
(\d{1,3})(\d{5}) \|$(overline $1)\|$2
(\d+) \1

== overline ==

(.*)(.) $(overline \1)\2̅	# recursive overline

== historical ==

(\d)(\d\d\d) $(\1:ↀↁↂ)$2
([123])(\d\d\d\d) $(\1:ↂ--)$(historical \2)
(.*) $1

== help ==

help Modules\nRoman: multiple parenthesized form\nRoman_2: overline (×1000) with bar (×100)\nFunctions: historical (in Roman_2) with special Unicode characters for 1000, 5000 and 10000
`
modules['Suzhou']=`
# Chinese Suzhou numbers, see Wikipedia
(\d+)[.,](\d+) $(\1\2::)\n$(:\1:)
(\d+) $(\1::)\n$(:\1:)
(\d+)0:: $(\1::)
(\d+):: $(\1:)

0: 〇
^1: 〡
^2: 〢
^3: 〣
1: 一
2: 二
3: 三
4: 〤
5: 〥
6: 〦
7: 〧
8: 〨
9: 〩
:\d{2}: 拾
:\d{3}: 百
:\d{4}: 千
:\d{5}: 萬
:\d{6}: 拾萬
:\d{7}: 百萬
:\d{8}: 千萬
:\d{9}: 億
:\d{10}: 拾億
:\d{11}: 百億
:\d{12}: 千億

(\d+)0: $(\1:)〇
(\d+)0([1-9]\d*): $(\1:)〇|$(\2:)
^([123])(\d+):	$(\1:)$(\2:)
(\d)(\d+):	$(\1:)|$(\2:)

"\D\D\D (\d[.,\d]*)" $1元

# formal currency: 圆
`
modules['af']=`
^0$ nul
1 een
2 twee
3 drie
4 vier
5 vyf
6 ses
7 sewe
8 agt
9 nege

10 tien
11 elf
12 twaalf
13 dertien
14 veertien
17 sewentien
18 agtien
19 negentien
1(\d) $1|tien

20 twintig
30 dertig
40 veertig
70 sewentig
80 tagtig
90 negentig
(\d)0 $1tig
(\d)(\d) $2-en-$(\10)

# function a
a:0* " "	# eenhonderd
a:0*1?\d -en-	# eenhonderd-en-een
a:0*\d0 -en-	# eenhonderd-en-twintig
a:\d+ " "	# eenhonderd een-en-twintig

# function b
b:0*1?\d	# negentienduisend
b:0*\d0		# twintigduisend
b:\d+ " "	# een-en-twintig duisend

^1(\d\d) honderd$(a:\1)$1
(\d)(\d\d) $1honderd$(a:\2)$2

^1(\d{3}) duisend$(a:\1)$1
(\d{1,3})(\d{3}) $1$(b:\1)duisend$(a:\2)$2

(\d{1,3})(\d{6}) $1$(b:\1)miljoen$(a:\2)$2
(\d{1,3})(\d{9}) $1$(b:\1)miljard$(a:\2)$2
(\d{1,3})(\d{12}) $1$(b:\1)biljoen$(a:\2)$2
(\d{1,3})(\d{15}) $1$(b:\1)biljard$(a:\2)$2
(\d{1,3})(\d{18}) $1$(b:\1)triljoen$(a:\2)$2
(\d{1,3})(\d{21}) $1$(b:\1)triljard$(a:\2)$2

# negative number

[-−](\d+) min |$1

# decimals

([-−]?\d+)[.,] $1| komma
([-−]?\d+[.,]\d*)(\d) $1| |$2

# currencies

# unit/subunit

u:([^,]*),([^,]*),([^,]*)	\1
s:([^,]*),([^,]*),([^,]*)	\2
p:([^,]*),([^,]*),([^,]*)	\3

CHF:(.)	$(\1: Zwitserse franc, centime, centimes)
CNY:(.)	$(\1: renminbi yuan, fen, fen)
EUR:(.)	$(\1: euro, cent, cent)
GBP:(.)	$(\1: pond sterling, penny, pence)
JPY:(.)	$(\1: yen, sen, sen)
USD:(.)	$(\1: Amerikaanse dollar, sent, sent)
ZAR:(.)	$(\1: rand, sent, sent)

"(JPY [-−]?\d+)[.,](\d\d)0" $1
"(JPY [-−]?\d+[.,]\d\d)(\d)" $1 $2 rin

"([A-Z]{3}) ([-−]?0)([.,]00?)?" nul$(\1:u)
"([A-Z]{3}) ([-−]?\d+)([.,]00?)?" $2$(\1:u)

"(CNY [-−]?\d+)[.,](\d)0?" $1 $2 jiao
"(CNY [-−]?\d+[.,]\d)(\d)" $1 $2 fen

"(([A-Z]{3}) [-−]?\d+)[.,](01)" $1 een$(\2:s)
"(([A-Z]{3}) [-−]?\d+)[.,](\d)" $1 $(\30)$(\2:p)
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1 $3$(\2:p)

== ordinal ==

([-−]?([24-6]|\d*1\d|\d+0[24-6]))	$1|de
([-−]?([79]|\d+0[79]))			$1|nde
([-−]?\d+)				$(ordinal |$1)

(.*)een		\1eerste
(.*)drie	\1derde
(.*)		\1ste

== ordinal-number ==

([-−]?([2-79]|\d*1\d|\d+0[2-79]))	\1de
([-−]?\d+)				\1ste

== help ==

"" $(1), $(2), $(3)\n$(help ordinal)$(help ordinal-number)
(ordinal(-number)?) \1: $(\1 1), $(\1 2), $(\1 3)\n
`
modules['ca']=`
^0 zero
1$ u
1 un
2 dos
3 tres
4 quatre
5 cinc
6 sis
7 set
8 vuit
9 nou
10 deu
11 onze
12 dotze
13 tretze
14 catorze
15 quinze
16 setze
17 disset
1(\d) di$1
20 vint
2(\d) vint-i-$1
30 trenta
40 quaranta
50 cinquanta
60 seixanta
70 setanta
80 vuitanta
90 noranta
(\d)(\d) $(\10)-$2
1(\d\d) cent[ $1]
(\d)(\d\d) $1-cents[ $2]
1(\d{3}) mil[ $1]
(\d{1,3})(\d{3}) $1 mil[ $2]
1(\d{6}) un milió[ $1]
(\d{1,6})(\d{6}) $1 milions[ $2]
1(\d{9}) mil milions[ $1]
1(\d{12}) un bilió[ $1]
(\d{1,6})(\d{12}) $1 bilions[ $2]
1(\d{18}) un trilió[ $1]
(\d{1,6})(\d{18}) $1 trilions[ $2]
1(\d{24}) un quadrilió[ $1]
(\d{1,6})(\d{24}) $1 quadrilions[ $2]

# negative number

[-−](\d+) menys |$1

# decimals

"([-−]?\d+)[.,]" |$1| coma
"([-−]?\d+[.,]\d*)(\d)" $1| |$2

# currency

# convert masculine to feminine

f:(.*ili)(.*) \1$(f:\2) # convert only <1000000
f:(.*u)n([^a].*|$) $(f:\1na\2) # un -> una
f:(.*d)o(s.*) $(f:\1ue\2) # dos -> dues
f:(.*cent)(s.*) $(f:\1e\2) # cents -> centes
.:(.*) \1

# unit/subunit singular/plural

# million or greater part of the number name separated by "ili" pattern
# before masculine to feminine conversion

us(.).:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) $(\1:\7) \2
up(.).:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) $(\1:\7) \3
ud(.).:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) $(\1:\7) \4
ss.(.):([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) $(\1:\7) \5
sp.(.):([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) $(\1:\7) \6

# "mm" means masculine unit and masculine subunit

# Usually used by Catalan users
CHF:(.+),(.+) $(\2mm: franc suís, francs suïssos, de francs suïssos, cèntim, cèntims, \1)
EUR:(.+),(.+) $(\2mm: euro, euros, d'euros, cèntim, cèntims, \1)
GBP:(.+),(.+) $(\2fm: lliura esterlina, lliures esterlines, de lliures esterlines, penic, penics, \1)
JPY:(.+),(.+) $(\2mm: ien, iens, de iens, sen, sen, \1)
USD:(.+),(.+) $(\2mm: dòlar EUA, dòlars EUA, de dòlars EUA, centau, centaus, \1)

# ACTIVE ISO 4217 CODES--A--
AED:(.+),(.+) $(\2mm: dírham dels Emirats Àrabs Units, dírhams dels Emirats Àrabs Units, de dírhams dels Emirats Àrabs Units, fils, fulús, \1)
AFN:(.+),(.+) $(\2mm: afgani, afganis, d'afganis, puli, puli, \1)
ALL:(.+),(.+) $(\2mm: lek, lekë, de lekë, qindarka, qindarka, \1)
AMD:(.+),(.+) $(\2mm: dram, drams, de drams, luma, luma, \1)
ANG:(.+),(.+) $(\2mm: florí de les Antilles Neerlandeses, florins de les Antilles Neerlandeses, de florins de les Antilles Neerlandeses, cèntim, cèntims, \1)
AOA:(.+),(.+) $(\2fm: kwanza, kwanzes, de kwanzes, cèntim cèntims, \1)
ARS:(.+),(.+) $(\2mm: peso argentí, pesos argentins, de pesos argentins, centau, centaus, \1)
AUD(.+),(.+) $(\2mm: dòlar australià, dòlars australians, de dòlars australians, centau, centaus, \1)
AWG:(.+),(.+) $(\2mm: florí d'Aruba, florins d'Aruba, de florins d'Aruba, cèntim, cèntims, \1)
AZN:(.+),(.+) $(\2mm: manat azerbaidjanès, manats azerbaidjanesos, de manats azerbaidjanesos, qəpik, qəpik, \1)

# ACTIVE ISO 4217 CODES --X--
#XAF Franc CFA emès pel BEAC (Banc dels Estats de l'Àfrica Central)
XAG:(.+),(.+) $(\2fm: unça de plata, unces de plata, d'unces de plata, cèntim, cèntims, \1)
XAU:(.+),(.+) $(\2fm: unça d'or, unces d'or, d'unces d'or, cèntim, cèntims, \1)
#XBA Unitat compensatòria europea (EURCO) (unitat per al mercat d'obligacions)
#XBB Unitat monetària europea (EMU-6) (unitat per al mercat d'obligacions)
#XBC Unitat de compte europea 9 (EUA-9) (unitat per al mercat d'obligacions)
#XBD Unitat de compte europea 17 (EUA-17) (unitat per al mercat d'obligacions)
#XCD Dòlar del Carib Oriental
#XDR Drets especials de gir (del Fons Monetari Internacional)
#XFU Franc UIC (divisa especial)
#XOF Franc CFA emès pel BCEAO (Banc Central dels Estats de l'Àfrica Occidental)
XPD:(.+),(.+) $(\2fm: unça de pal·ladi, unces de pal·ladi, d'unces de pal·ladi, cèntim, cèntims, \1)
#XPF Franc CFP (per als territoris francesos del Pacífic)
XPT:(.+),(.+) $(\2fm: unça de platí, unces de platí, d'unces de platí, cèntim, cèntims, \1)
#XTS Codi reservat per a proves
#XXX Sense moneda, sense transacció monetària

# OBSOLETE ISO 4217 CODES --Replaced by EUR--
ADF:(.+),(.+) $(\2mm: franc andorrà, francs andorrans, de francs andorrans, cèntim, cèntims, \1)
ADP:(.+),(.+) $(\2fm: pesseta andorrana, pessetes andorranes, de pessetes andorranes, cèntim, cèntims, \1)
ATS:(.+),(.+) $(\2mm: xíling austríac, xílings austríacs, de xílings austríacs, groschen, groschen, \1)
BEF:(.+),(.+) $(\2mm: franc belga, francs belgues, de francs belgues, cèntim, cèntims, \1)
CYP:(.+),(.+) $(\2mm: lliura xipriota, lliures xipriotes, de lliures xipriotes, cèntim, cèntims, \1)
DEM:(.+),(.+) $(\2mm: marc alemany, marcs alemanys, de marcs alemanys, penic, penics, \1)
ESP:(.+),(.+) $(\2fm: pesseta, pessetes, de pessetes, cèntim, cèntims, \1)
FIM:(.+),(.+) $(\2mm: marc finlandès, marcs finlandesos, de marcs finlandesos, penic, penics, \1)
FRF:(.+),(.+) $(\2mm: franc francès, francs francesos, de francs francesos, cèntim, cèntims, \1)
GRD:(.+),(.+) $(\2fm: dracma grega, dracmes gregues, leptó, leptà, \1)
IEP:(.+),(.+) $(\2fm: lliura irlandesa, lliures irlandeses, de lliures irlandeses, penic, penics, \1)
ITL:(.+),(.+) $(\2fm: lira italiana, lires italianes, de lires italianes, cèntim, cèntims, \1)
LUF:(.+),(.+) $(\2mm: franc luxemburguès, francs luxemburguesos, de francs luxemburguesos, cèntim, cèntims, \1)
MCF:(.+),(.+) $(\2mm: franc monegasc, francs monegascs, de francs monegascs, cèntim, cèntims, \1)
MTL:(.+),(.+) $(\2fm: lira maltesa, lires malteses, de lires malteses, cèntim, cèntims, \1)
NLG:(.+),(.+) $(\2mm: florí neerlandès, florins neerlandesos, de florins neerlandesos, cèntim, cèntims, \1)
PTE:(.+),(.+) $(\2mm: escut portuguès, escuts portuguesos, de escuts portuguesos, centau, centaus, \1)
SIT:(.+),(.+) $(\2mm: tolar eslovè, tolars eslovens, de tolars eslovens, stotin, stotinov, \1)
SKK:(.+),(.+) $(\2fm: corona eslovaca, corones eslovaques, de corones eslovaques, halier, halierov, \1)
SML:(.+),(.+) $(\2fm: lira de San Marino, lires de San Marino, de lires de San Marino, cèntim, cèntims, \1)
VAL:(.+),(.+) $(\2fm: lira vaticana, lires vaticanes, de lires vaticanes, cèntim, cèntims, \1)
XEU:(.+),(.+) $(\2mm: ecu, ecus, d'ecus, cèntim, cèntims, \1)

"([A-Z]{3}) ([-−]?[01])([.,]00?)?"$(\1:|$2,us)
"([A-Z]{3}) ([-−]?\d+0{6,})([.,]00?)?"$(\1:|$2,ud)
"([A-Z]{3}) ([-−]?\d+)([.,]00?)?"$(\1:|$2,up)

"(([A-Z]{3}) [-−]?\d+)[.,](01)" $1 amb$(\2:un,ss)
"(([A-Z]{3}) [-−]?\d+)[.,](\d)" $1 amb$(\2:|$(\30),sp)
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1 amb$(\2:|$3,sp)

== feminine ==

1 una
(.*)	$(f:|$1)

== masculine ==

1 un
(.*)	$1

== ordinal(-masculine)? ==

1 primer
2 segon
([-−]?\d+) $(ordinal |$2)

(.*)nou		\2novè
(.*)deu		\2desè
(.*-)u(na?)?	\2unè
"(.* )u(na?)?"	\2 primer
"(.* )dos"	\2segon
"(.* t|t)res"	\2ercer
"(.* q|q)uatre"	\2uart
(.*)cinc	\2cinquè
(.*)[ae]	\2è
(.*(cent|mil|ion))s?	\2è
(.*li)ó		\2onè
(.*)		\2è

== ordinal-feminine ==

([-−]?\d+) $(ordinal-feminine $(ordinal-masculine \1))
(.*)è  \1ena
(.*)   \1a

== (ordinal)-number-(feminine|masculine) ==

([-−]?\d+)	\3$(ordinal-number $(\1-\2 \3))
.*(.) \1

== help ==

"" $(1)|, $(2), $(3)\n$(help feminine)$(help masculine)$(help ordinal-number-masculine)$(help ordinal-number-feminine)$(help ordinal-feminine)$(help ordinal-masculine)
(feminine|masculine|ordinal(-number)?(-feminine|-masculine)?) \1: $(\1 1), $(\1 2), $(\1 3)\n
`
modules['cs']=`
^0 nula
^1$ jedno
1 jeden
^2$ dvě
2 dva
3 tři
4 čtyři
5 pět
6 šest
7 sedm
8 osm
9 devět
10 deset
11 jedenáct
14 čtrnáct
15 patnáct
19 devatenáct
1(\d) $1náct
([234])(\d) $1cet[ $2]
5(\d) padesát[ $1]
6(\d) šedesát[ $1]
9(\d) devadesát[ $1]
(\d)(\d) $1desát[ $2]
1(\d\d) sto[ $1]
2(\d\d) dvě stě[ $1]
([34])(\d\d) $1 sta[ $2]
(\d)(\d\d) $1 set[ $2]
1(\d\d\d) tisíc[ $1]
([234])(\d\d\d) $1 tisíce[ $2]
(\d{1,3})(\d\d\d) $1 tisíce[ $2]
1(\d{6}) milión[ $1]
([234])(\d{6}) $1 milióny[ $2]
(\d{1,3})(\d{6}) $1 miliónů[ $2]
1(\d{9}) miliarda[ $1]
([234])(\d{9}) $1 miliardy[ $2]
(\d{1,3})(\d{9}) $1 miliard[ $2]
1(\d{12}) bilión[ $1]
([234])(\d{12}) $1 bilióny[ $2]
(\d{1,3})(\d{12}) $1 biliónů[ $2]
1(\d{15}) biliarda[ $1]
([234])(\d{15}) $1 biliardy[ $2]
(\d{1,3})(\d{15}) $1 biliard[ $2]
1(\d{18}) trilion[ $1]
([234])(\d{18}) $1 trilióny[ $2]
(\d{1,3})(\d{18}) $1 triliónů[ $2]
1(\d{21}) triliarda[ $1]
([234])(\d{21}) $1 triliardy[ $2]
(\d{1,3})(\d{21}) $1 triliard[ $2]
1(\d{24}) kvadrilión[ $1]
([234])(\d{24}) $1 kvadrilióny[ $2]
(\d{1,3})(\d{24}) $1 kvadriliónů[ $2]

# negative number

[-−](\d+) minus |$1

# decimals

([-−]?\d+)[.,] $1| čárka
([-−]?\d+[.,])([^0]\d) $1| |$2
([-−]?\d+[.,])(\d)(\d)(\d) $1| |$2 |$3 |$4
([-−]?\d+[.,]\d*)(\d) $1| |$2

# currency

# unit/subunit singular/plural

us:([^,]*),([^,]*),([^,]*),([^,]*) \1
up:([^,]*),([^,]*),([^,]*),([^,]*) \2
ss:([^,]*),([^,]*),([^,]*),([^,]*) \3
sp:([^,]*),([^,]*),([^,]*),([^,]*) \4

CHF:(\D+) $(\1: švýcarský frank, švýcarských franků, centim, centimů)
CNY:(\D+) $(\1: juan renminbi, juan renminbi, fen, fen)
CZK:(\D+) $(\1: koruna česká, korun českých, haléř, haléřů)
EUR:(\D+) $(\1: euro, euro, cent, centů)
GBP:(\D+) $(\1: libra šterlinků, libra šterlinků, penny, pence)
JPY:(\D+) $(\1: jen, jenů, sen, sen)
USD:(\D+) $(\1: americký dolar, amerických dolarů, cent, centů)

"([A-Z]{3}) ([-−]?1)([.,]00?)?" $2$(\1:us)
"([A-Z]{3}) ([-−]?\d+)([.,]00?)?" $2$(\1:up)

"(CNY [-−]?\d+)[.,]10?" $1 $2 jiao
"(CNY [-−]?\d+)[.,](\d)0?" $1 $2 jiao
"(CNY [-−]?\d+[.,]\d)1" $1 $2 fen
"(CNY [-−]?\d+[.,]\d)(\d)" $1 $2 fen

"(([A-Z]{3}) [-−]?\d+)[.,](01)" $1 $(1)$(\2:ss)
"(([A-Z]{3}) [-−]?\d+)[.,](\d)" $1 $(\30)$(\2:sp)
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1 $3$(\2:sp)

== cardinal-neuter ==

(.*) $1

== cardinal-feminine ==

1 jedna
(.*) $1

== cardinal-masculine ==

1 jeden
2 dva
(.*) $1

== ordinal ==

([-−]?\d+)	$(ordinal |$1)

(.*)(jedno|jeden)	\1první
(.*)(dvě|dva)		\1druhý
(.*)tři			\1třetí
(.*)čtyři		\1čtvrtý
(.*)pět			\1pátý
(.*)(šest|sedm|osm|desát|náct|sát)	\1\2ý
(.*)devět		\1devátý
"(.*)[^ ](c|s)et"	\1\2átý
(.*)sto			\1stý
"(.*)dvě stě"		\1dvoustý
"(.*)tři sta"		\1třístý
"(.*)čtyři sta"		\1čtyřstý
"(.*)(pět|šest|sedm|osm) set"	\1\2istý
"(.*)devět set"		\1devítistý
(.*)tisíce?		\1tisící
(.*)milión[yů]		\1milióntý
(.*)miliard[ay]?	\1miliardtý

== ordinal-number ==

(\d+)	\1.

== help ==

"" |$(1)|, |$(2)|, |$(3)|\n$(help cardinal-neuter)$(help cardinal-feminine)$(help cardinal-masculine)$(help ordinal)$(help ordinal-number)
(.*) \1: |$(\1 1)|, |$(\1 2)|, |$(\1 3)|\n
`
modules['da']=`
^0 nul
1$ en
1 et
2 to
3 tre
4 fire
5 fem
6 seks
7 syv
8 otte
9 ni
10 ti

11 elleve
12 tolv
13 tretten
14 fjorten
15 femten
16 seksten
17 sytten
18 atten
19 nitten 

20 tyve
30 tredive
40 fyrre
50 halvtreds
60 tres
70 halvfjerds
80 firs
90 halvfems

(\d)(\d) $2|og$(\10)

:0+
:(\d+) og $1

(\d)(\d\d) $1 hundrede $(:\2)
(\d{1,3})(\d{3}) $1 tusind $(:\2)

a:1,0+
a:\d+,0+ er
a:1,(\d+) " og $1"
a:\d+,(\d+) "er og $1"

(\d{1,3})(\d{6}) $1 million$(a:\1,\2)
(\d{1,3})(\d{9}) $1 milliard$(a:\1,\2)
(\d{1,3})(\d{12}) $1 billion$(a:\1,\2)
(\d{1,3})(\d{15}) $1 billiard$(a:\1,\2)
(\d{1,3})(\d{18}) $1 trillion$(a:\1,\2)
(\d{1,3})(\d{21}) $1 trilliard$(a:\1,\2)
(\d{1,3})(\d{24}) $1 kvadrillion$(a:\1,\2)

# negative number

[-−](\d+) minus |$1

# decimals

([-−]?\d+)[.,] $1| komma
"([-−]?\d+[.,]0*)(\d+)" $1 |$2
([-−]?\d+[.,]\d*)(\d) $1| |$2

# currency

# unit/subunit singular/plural

us:([^,]*),([^,]*),([^,]*),([^,]*) \1
up:([^,]*),([^,]*),([^,]*),([^,]*) \2
ss:([^,]*),([^,]*),([^,]*),([^,]*) \3
sp:([^,]*),([^,]*),([^,]*),([^,]*) \4

CHF:(\D+) $(\1: schweizisk franc, schweizisk franc, centime, centimes)
CNY:(\D+) $(\1: renminbi yuan, renminbi yuan, fen, fen)
DKK:(\D+) $(\1: dansk krone, danske kroner, øre, øre)
EUR:(\D+) $(\1: euro, euro, cent, cent)
GBP:(\D+) $(\1: pund sterling, pund sterling, penny, pence)
ISK:(\D+) $(\1: islandsk krone, islandske kroner, eyrir, aurar)
JPY:(\D+) $(\1: yen, yen, sen, sen)
SEK:(\D+) $(\1: svensk krone, svenske kroner, öre, öre)
USD:(\D+) $(\1: US dollar, US dollar, cent, cent)

"([A-Z]{3}) ([-−]?1)([.,]00?)?" $2$(\1:us)
"([A-Z]{3}) ([-−]?\d+)([.,]00?)?" $2$(\1:up)

"(CNY [-−]?\d+)[.,]10?" $1 $2 jiao
"(CNY [-−]?\d+)[.,](\d)0?" $1 $2 jiao
"(CNY [-−]?\d+[.,]\d)1" $1 $2 fen
"(CNY [-−]?\d+[.,]\d)(\d)" $1 $2 fen

"(([A-Z]{3}) [-−]?\d+)[.,](01)" $1 |$(1)$(\2:ss)
"(([A-Z]{3}) [-−]?\d+)[.,](\d)" $1 |$(\30)$(\2:sp)
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1 |$3$(\2:sp)

== ordinal ==

([-−]?\d+) $(ordinal |$1)

nul		nulte		# 0
en		først		# 1
"(.*) en"	\1 først	# 1
(.*)to		\1anden		# 2
(.*)tre		\1tredje	# 3
(.*)fire	\1fjerde	# 4
(.*(fem|ellev|tolv|ard|on))(e|er)?	\1te # 5, 11, 12, 10^6, 10^9 etc.
(.*)seks	\1sjette	# 6
(.*)tres	\1tressende	# 60
(.*(syv|ott|ni|ti|tyv|trediv|fyrr|s))e?	\1ende # 7, 8, 9, 10, 20, 30, 40, 50, 70, 80, 90
(.*en)		\1de		# 13-19
(.*tusind)	\1e		# 1000 etc.
(.*)		\1		# 100, etc.

== ordinal-number ==

(\d+)	\1.

== help ==

"" |$(1)|, |$(2)|, |$(3)|\n$(help ordinal)$(help ordinal-number)
(ordinal(-number)?) \1: |$(\1 1)|, |$(\1 2)|, |$(\1 3)|\n
`
modules['de']=`
^0$ null
1$ eins
1 ein
2 zwei
3 drei
4 vier
5 fünf
6 sechs
7 sieben
8 acht
9 neun
10 zehn
11 elf
12 zwölf
16 sechzehn
17 siebzehn
1(\d) $1zehn
2(\d) [$1und]zwanzig
3(\d) [$1und]dreissig	# [:de-CH:]
3(\d) [$1und]dreißig
6(\d) [$1und]sechzig
7(\d) [$1und]siebzig
(\d)(\d) [$2und]$1zig
(\d)(\d\d) $1hundert$2
(\d{1,3})(\d{3}) $1tausend$2
1(\d{6}) eine Million[ $1]
(\d{1,3})(\d{6}) $1 Millionen[ $2]
1(\d{9}) eine Milliarde[ $1]
(\d{1,3})(\d{9}) $1 Milliarden[ $2]
1(\d{12}) eine Billion[ $1]
(\d{1,3})(\d{12}) $1 Billionen[ $2]
1(\d{15}) eine Billiarde[ $1]
(\d{1,3})(\d{15}) $1 Billiarden[ $2]
1(\d{18}) eine Trillion[ $1]
(\d{1,3})(\d{18}) $1 Trillionen[ $2]
1(\d{21}) eine Trilliarde[ $1]
(\d{1,3})(\d{21}) $1 Trilliarden[ $2]

# negative number

[-−](\d+) minus |$1

# decimals

"([-−]?\d+)[.,]" $1| Komma
"([-−]?\d+[.,]\d*)(\d)" $1| |$2

# currency

# unit/subunit singular/plural

us:([^,]*),([^,]*),([^,]*),([^,]*) \1
up:([^,]*),([^,]*),([^,]*),([^,]*) \2
ss:([^,]*),([^,]*),([^,]*),([^,]*) \3
sp:([^,]*),([^,]*),([^,]*),([^,]*) \4

CHF:(\D+) $(\1: Schweizer Franken, Schweizer Franken, Rappen, Rappen)
CNY:(\D+) $(\1: Yuan, Yuan, Fen, Fen)
EUR:(\D+) $(\1: Euro, Euro, Cent, Cent)
GBP:(\D+) $(\1: Pfund Sterling, Pfund Sterling, Penny, Pence)
USD:(\D+) $(\1: US-Dollar, US-Dollar, Cent, Cents)

"JPY ([-−]?\d+([.,]\d+)?)" $1 Yen

"([A-Z]{3}) ([-−]?1)([.,]00?)?" $2$(\1:us)
"([A-Z]{3}) ([-−]?\d+)([.,]00?)?" $2$(\1:up)

"(CNY [-−]?\d+)[.,]10?" $1 $2 Jiao
"(CNY [-−]?\d+)[.,](\d)0?" $1 $2 Jiao
"(CNY [-−]?\d+[.,]\d)1" $1 $2 Fen
"(CNY [-−]?\d+[.,]\d)(\d)" $1 $2 Fen

"(([A-Z]{3}) [-−]?\d+)[.,](01)" $1 und $(1)$(\2:ss)
"(([A-Z]{3}) [-−]?\d+)[.,](\d)" $1 und $(\30)$(\2:sp)
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1 und $3$(\2:sp)

== ordinal ==

([-−]?[024569])		$1te
([-−]?\d*0[24569])	$1te
([-−]?\d*1\d)		$1te
([-−]?\d+)		$(ordinal $1)

(.*)eins	\1erste
(.*)drei	\1dritte
(.*)sieben	\1siebte
(.*)acht	\1achte
"(.*)eine Milli(on|ard)e?"	\1einmilli\2ste
"(.*)eine Billi(on|ard)e?"	\1einbilli\2ste
"(.*)eine Trilli(on|ard)e?"	\1eintrilli\2ste
"(.*) Milli(on|ard)en"	\1milli\2ste
"(.*) Billi(on|ard)en"	\1billi\2ste
"(.*) Trilli(on|ard)en"	\1trilli\2ste
(.*)		\1ste

== ordinal-number ==

(\d+)	\1.

== help ==

"" |$(1)|, |$(2)|, |$(3)|\n$(help ordinal)$(help ordinal-number)
(ordinal(-number)?) \1: |$(\1 1)|, |$(\1 2)|, |$(\1 3)|\n
`
modules['el']=`
^0 μηδέν
1 ένα
2 δύο
3$ τρία
3 τρεις
4$ τέσσερα
4 τέσσερις
5 πέντε
6 έξι
7 επτά
8 οκτώ
9 εννέα
10 δέκα
11 έντεκα
12 δώδεκα
1(\d) δεκα$1
2(\d) είκοσι[ $1]
3(\d) τριάντα[ $1]
4(\d) σαράντα[ $1]
5(\d) πενήντα[ $1]
6(\d) εξήντα$1
7(\d) εβδομήντα[ $1]
8(\d) ογδόντα[ $1]
9(\d) ενενήντα[ $1]
1(\d\d) εκατό[v $1]
2(\d\d)$ διακόσια[ $1]
2(\d\d) διακόσιες[ $1]
3(\d\d)$ τριακόσια[ $1]
3(\d\d) τριακόσιες[ $1]
4(\d\d)$ τετρακόσια[ $1]
4(\d\d) τετρακόσιες[ $1]
5(\d\d)$ πεντακόσια[ $1]
5(\d\d) πεντακόσιες[ $1]
6(\d\d)$ εξακόσια[ $1]
6(\d\d) εξακόσιες[ $1]
7(\d\d)$ επτακόσια[ $1]
7(\d\d) επτακόσιες[ $1]
8(\d\d)$ οκτακόσια[ $1]
8(\d\d) οκτακόσιες[ $1]
9(\d\d)$ εννιακόσια[ $1]
9(\d\d) εννιακόσιες[ $1]
1(\d{3}) χίλια[ $1]
(\d{1,3})(\d{3}) $1 χιλιάδες[ $2]
1(\d{6}) ένα εκατομμύριο[ $1]
(\d{1,3})(\d{6}) $1| εκατομμύρια[ $2]
1(\d{9}) ένα δισεκατομμύριο[ $1]
(\d{1,3})(\d{9}) $1| δισεκατομμύρια[ $2]
1(\d{12}) ένα τρισεκατομμύριο[ $1]
(\d{1,3})(\d{12}) $1| τρισεκατομμύρια[ $2]
1(\d{15}) ένα τετράκις εκατομμύριο[ $1]
(\d{1,3})(\d{15}) $1| τετράκις εκατομμύρια[ $2]
1(\d{18}) ένα πεντάκις εκατομμύριο[ $1]
(\d{1,3})(\d{18}) $1| πεντάκις εκατομμύρια[ $2]
1(\d{21}) ένα εξάκις εκατομμύριο[ $1]
(\d{1,3})(\d{21}) $1| εξάκις εκατομμύρια[ $2]
1(\d{24}) ένα επτάκις εκατομμύριο[ $1]
(\d{1,3})(\d{24}) $1| επτάκις εκατομμύρια[ $2]

# negative number

[-−](\d+) μείον |$1

# decimals

"([-−]?\d+)[.,]" "$1| κόμμα"
"([-−]?\d+[.,]\d*)(\d)" $1| |$2

# currency

# unit/subunit singular/plural

us:([^,]*),([^,]*),([^,]*),([^,]*) \1
up:([^,]*),([^,]*),([^,]*),([^,]*) \2
ss:([^,]*),([^,]*),([^,]*),([^,]*) \3
sp:([^,]*),([^,]*),([^,]*),([^,]*) \4

CHF:(\D+) $(\1: ελβετικό φράγκο, ελβετικό φράγκο, σαντίμ, σαντίμ)
GBP:(\D+) $(\1: λίρα στερλίνα, λίρα στερλίνα, πέννα, πένες)
JPY:(\D+) $(\1: γιεν, γιεν, σεν, σεν)
EUR:(\D+) $(\1: ευρώ, ευρώ, λεπτό, λεπτά)
USD:(\D+) $(\1: δολάριο ΗΠΑ, δολαρίων ΗΠΑ, σεντ, σεντς)

"([A-Z]{3}) ([-−]?1)([.,]00?)?" $2$(\1:us)
"([A-Z]{3}) ([-−]?\d+)([.,]00?)?" $2$(\1:up)
"(([A-Z]{3}) [-−]?\d+)[.,](01)" $1 y |$(1)$(\2:ss)
"(([A-Z]{3}) [-−]?\d+)[.,](\d)" $1 y |$(\30)$(\2:sp)
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1 y |$3$(\2:sp)

== ordinal-number ==

(\d+)	\1.

== help ==

"" |$(1)|, |$(2)|, |$(3)|\n$(help ordinal-number)
(.*) \1: |$(\1 1)|, |$(\1 2)|, |$(\1 3)|\n
`
modules['en']=`
^0 zero
1 one
2 two
3 three
4 four
5 five
6 six
7 seven
8 eight
9 nine
10 ten
11 eleven
12 twelve
13 thirteen
15 fifteen
18 eighteen
1(\d) $1teen
2(\d) twenty[-$1]
3(\d) thirty[-$1]
4(\d) forty[-$1]
5(\d) fifty[-$1]
8(\d) eighty[-$1]
(\d)(\d) $1ty[-$2]

# separator function
:0+			# one million
:0*\d?\d " and "	# one million and twenty-two
:\d+ ", "		# one million, one thousand

(\d)(\d\d) $1 hundred[ and $2]		# one hundred and one [:en-AU:] [:en-GB:] [:en-IE:] [:en-NZ:]
(\d)(\d\d) $1 hundred[ $2]		# default: one hundred one
(\d{1,2})([1-9]\d\d) $1 thousand[ $2]	# ten thousand two hundred

(\d{1,2})(\d{3}) $1 thousand$(:\2)$2	# [:en-IN:] one hundred thousand, two hundred
(\d{1,2})(000\d\d) $1 lakh$(:\2)$2	# [:en-IN:] one lakh and two
(\d{1,2})(\d{5}) $1 lakh[ $2]		# [:en-IN:] one lakh two hundred
(\d{1,4})(\d{7}) $1 crore$(:\2)$2	# [:en-IN:]

(\d{1,3})(\d{3}) $1 thousand$(:\2)$2	# one hundred thousand, two hundred
(\d{1,3})(\d{6}) $1 million$(:\2)$2
(\d{1,3})(\d{9}) $1 billion$(:\2)$2
(\d{1,3})(\d{12}) $1 trillion$(:\2)$2
(\d{1,3})(\d{15}) $1 quadrillion$(:\2)$2
(\d{1,3})(\d{18}) $1 quintillion$(:\2)$2
(\d{1,3})(\d{21}) $1 sextillion$(:\2)$2
(\d{1,3})(\d{24}) $1 septillion$(:\2)$2
(\d{1,3})(\d{27}) $1 octillion$(:\2)$2
(\d{1,3})(\d{30}) $1 nonillion$(:\2)$2
(\d{1,3})(\d{33}) $1 decillion$(:\2)$2
(\d{1,3})(\d{36}) $1 undecillion$(:\2)$2
(\d{1,3})(\d{39}) $1 duodecillion$(:\2)$2
(\d{1,3})(\d{42}) $1 tredecillion$(:\2)$2

# negative number

[-−](\d+) negative |$1

# decimals

0[.,] point
([-−]?\d+)[.,] $1| point
([-−]?\d+[.,]\d*)(\d) $1| |$2

# currency

# unit/subunit singular/plural

us:([^,]*),([^,]*),([^,]*),([^,]*) \1
up:([^,]*),([^,]*),([^,]*),([^,]*) \2
ss:([^,]*),([^,]*),([^,]*),([^,]*) \3
sp:([^,]*),([^,]*),([^,]*),([^,]*) \4

AUD:(\D+) $(\1: Australian dollar, Australian dollars, cent, cents)
BGN:(\D+) $(\1: lev, leva, stotinka, stotinki)
BWP:(\D+) $(\1: pula, pula, thebe, thebe)
CAD:(\D+) $(\1: Canadian dollar, Canadian dollars, cent, cents)
CHF:(\D+) $(\1: Swiss franc, Swiss francs, centime, centimes)
CNY:(\D+) $(\1: Chinese yuan, Chinese yuan, fen, fen)
CZK:(\D+) $(\1: Czech koruna, Czech koruny, halér, halére)
EEK:(\D+) $(\1: kroon, kroonid,	sent, senti)
EUR:(\D+) $(\1: euro, euro, cent, cents)
GBP:(\D+) $(\1: pound sterling, pounds sterling, penny, pence)
GHS:(\D+) $(\1: Ghana cedi, Ghana cedis, pesewa, pesewas)
GMD:(\D+) $(\1: dalasi, dalasi, butut, bututs)
HKD:(\D+) $(\1: Hong Kong dollar, Hong Kong dollars, cent, cents)
HRK:(\D+) $(\1: kuna, kuna, lipa, lipa)
HUF:(\D+) $(\1: forint, forint, fillér, fillér)
INR:(\D+) $(\1: Indian rupee, Indian rupees, paisa, paise)
JMD:(\D+) $(\1: Jamaica dollar, Jamaica dollars, cent, cents)
JPY:(\D+) $(\1: Japanese yen, Japanese yen, sen, sen)
KES:(\D+) $(\1: Kenyan shilling, Kenyan shillings, cent, cents)
LRD:(\D+) $(\1: Liberian dollar, Liberian dollars, cent, cents)
LSL:(\D+) $(\1: loti, maloti, sente, lisente)
LTL:(\D+) $(\1: litas, litai, centas, centai)
LVL:(\D+) $(\1: lats, lati, santims, santimi)
MGA:(\D+) $(\1: ariary, ariaries, iraimbilanja, iraimbilanja)
MUR:(\D+) $(\1: Mauritian rupee, Mauritian rupees, cent, cents)
MXN:(\D+) $(\1: Mexican peso, Mexican pesos, centavo, centavos)
MWK:(\D+) $(\1: Malawian kwacha, Malawian kwacha, tambala, tambala)
NAD:(\D+) $(\1: Namibian dollar, Namibian dollars, cent, cents)
NGN:(\D+) $(\1: naira, naira, kobo, kobo)
NZD:(\D+) $(\1: New Zealand dollar, New Zealand dollars, cent, cents)
PGK:(\D+) $(\1: kina, kina, toea, toea)
PHP:(\D+) $(\1: Philippine peso, Philippine pesos, centavo, centavos)
PKR:(\D+) $(\1: Pakistani rupee, Pakistani rupees, paisa, paise)
PLN:(\D+) $(\1: zloty, zlotys, grosz, groszy)
RON:(\D+) $(\1: Romanian leu, Romanian lei, ban, bani)
RSD:(\D+) $(\1: Serbian dinar, Serbian dinars, para, para)
RUB:(\D+) $(\1: Russian ruble, Russian rubles, kopek, kopeks)
RWF:(\D+) $(\1: Rwandese franc, Rwandese francs, centime, centimes)
SDG:(\D+) $(\1: Sudanese pound, Sudanese pounds, piastre, piastres)
SGD:(\D+) $(\1: Singapore dollar, Singapore dollars, cent, cents)
SLL:(\D+) $(\1: leone, leones, cent, cents)
SZL:(\D+) $(\1: lilangeni, emalangeni, cent, cents)
THB:(\D+) $(\1: baht, baht, satang, satang)
TRY:(\D+) $(\1: Turkish lira, Turkish lira, kurus, kurus)
TTD:(\D+) $(\1: Trinidad and Tobago dollar, Trinidad and Tobago dollars, cent, cents)
TZS:(\D+) $(\1: Tanzanian shilling, Tanzanian shillings, cent, cents)
UAH:(\D+) $(\1: hryvnia, hryvnia, kopiyka, kopiyka)
UGX:(\D+) $(\1: Uganda shilling, Uganda shillings, cent, cents)
USD:(\D+) $(\1: U.S. dollar, U.S. dollars, cent, cents)
X[AO]F:(\D+) $(\1: CFA franc, CFA francs, centime, centimes)
ZAR:(\D+) $(\1: South African rand, South African rand, cent, cents)
ZMK:(\D+) $(\1: Zambian kwacha, Zambian kwacha, ngwee, ngwee)
ZWL:(\D+) $(\1: Zimbabwe dollar, Zimbabwe dollars, cent, cents)

"(JPY [-−]?\d+)[.,](\d\d)0" $1
"(JPY [-−]?\d+[.,]\d\d)(\d)" $1 $2 rin

"([A-Z]{3}) ([-−]?1)([.,]00?)?" $2$(\1:us)
"([A-Z]{3}) ([-−]?\d+)([.,]00?)?" $2$(\1:up)

"(CNY [-−]?\d+)[.,](\d)0?" $1 $2 jiao
"(CNY [-−]?\d+[.,]\d)(\d)" $1 $2 fen

"((MGA|MRO) [-−]?\d+)[.,]0" $1
"((MGA|MRO) [-−]?\d+)[.,]2" $1 and |$(1)$(\2:ss)
"((MGA|MRO) [-−]?\d+)[.,]4" $1 and |$(2)$(\2:sp)
"((MGA|MRO) [-−]?\d+)[.,]6" $1 and |$(3)$(\2:sp)
"((MGA|MRO) [-−]?\d+)[.,]8" $1 and |$(4)$(\2:sp)

"(([A-Z]{3}) [-−]?\d+)[.,](01)" $1 and |$(1)$(\2:ss)
"(([A-Z]{3}) [-−]?\d+)[.,](\d)" $1 and |$(\30)$(\2:sp)
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1 and |$3$(\2:sp)

== money ==

"(JPY [-−]?\d+)[.,](\d\d)0" $1
"(JPY [-−]?\d+[.,]\d\d)(\d)" $1 $2 rin

"([A-Z]{3}) ([-−]?1)([.,]00?)?" $2$(\1:us)
"([A-Z]{3}) ([-−]?\d+)([.,]00?)?" $2$(\1:up)

"(CNY [-−]?\d+)[.,](\d)0?" $1 $2 jiao
"(CNY [-−]?\d+[.,]\d)(\d)" $1 $2 fen

"(MGA|MRO) ([-−]?\d+)[.,]0" $2$(\1:us)
"(MGA|MRO) ([-−]?\d+)[.,]2" $2 and 1/5$(\1:us)
"(MGA|MRO) ([-−]?\d+)[.,]4" $2 and 2/5$(\1:up)
"(MGA|MRO) ([-−]?\d+)[.,]6" $2 and 3/5$(\1:up)
"(MGA|MRO) ([-−]?\d+)[.,]8" $2 and 4/5$(\1:up)

"([A-Z]{3}) ([-−]?1)" $2$(\1:us)
"([A-Z]{3}) ([-−]?\d+)" $2$(\1:up)
"(([A-Z]{3}) ([-−]?\d+))[.,](01)" $3 and 1/100$(\2:us)
"(([A-Z]{3}) ([-−]?\d+))[.,](\d)" $3 and \40/100$(\2:up)
"(([A-Z]{3}) ([-−]?\d+))[.,](\d\d)" $3 and \4/100$(\2:up)
"(([A-Z]{3}) ([-−]?\d+))[.,](\d\d\d)" $3 and \4/1000$(\2:up)

== ordinal ==

# convert to text, and recall to convert
# cardinal names to ordinal ones

([-−]?\d+) $(ordinal |$1)

(.*)one	\1first
(.*)two	\1second
(.*)three	\1third
(.*)five	\1fifth
(.*)eight	\1eighth
(.*)nine	\1ninth
(.*)twelve	\1twelfth
(.*)y	\1ieth
(.*)	\1th

== ordinal-number ==

(.*1\d)	\1th
(.*1)	\1st
(.*2)	\1nd
(.*3)	\1rd
(.*)	\1th

== year ==

(1[1-9])00 $1 hundred
(1[1-9])([0-9][0-9]) $1 $2
(.*) $(year-remove-and $1)

== year-remove-and ==

"(.*) and (.*)" \1 \2
(.*) \1

== help ==

"" $(1)|, $(2), $(3)\n$(\0 ordinal)$(\0 ordinal-number)year: $(year 1999), two thousand, $(year 2001)\ncurrency \(for example, USD\): $(USD 2.5)\nmoney USD: $(money USD 2.5)
"(ordinal(-number)?|USD)" \1: $(\1 1), $(\1 2), $(\1 3)\n

`
modules['eo']=`
^0 nulo
1 unu
2 du
3 tri
4 kvar
5 kvin
6 ses
7 sep
8 ok
9 naŭ
1(\d) dek[ $1]
(\d)(\d) $1dek[ $2]
1(\d\d) cent[ $1]
(\d)(\d\d) $1cent[ $2]
1(\d{3}) mil[ $1]
(\d{1,3})(\d{3}) $1 mil[ $2]
1(\d{6}) unu miliono[ $1]
(\d{1,3})(\d{6}) $1 milionoj[ $2]
1(\d{9}) unu miliardo[ $1]
(\d{1,3})(\d{9}) $1 miliardoj[ $2]
1(\d{12}) unu duiliono[ $1]
(\d{1,3})(\d{12}) $1 duilionoj[ $2]
1(\d{15}) unu duiliardo[ $1]
(\d{1,3})(\d{15}) $1 duiliardoj[ $2]
1(\d{18}) unu triiliono[ $1]
(\d{1,3})(\d{18}) $1 triilionoj[ $2]
1(\d{21}) unu triiliardo[ $1]
(\d{1,3})(\d{21}) $1 triiliardoj[ $2]

# negative number

[-−](\d+) negativa |$1

# decimals

"([-−]?\d+)[.,]" "$1| komo"
"([-−]?\d+[.,]\d*)(\d)" $1| |$2

# currency

# unit/subunit singular/plural

us:([^,]*),([^,]*),([^,]*),([^,]*) \1
up:([^,]*),([^,]*),([^,]*),([^,]*) \2
ss:([^,]*),([^,]*),([^,]*),([^,]*) \3
sp:([^,]*),([^,]*),([^,]*),([^,]*) \4

CHF:(\D+) $(\1: svisa franko, svisaj frankoj, centimo, centimoj)
CNY:(\D+) $(\1: ĉina juano, ĉinaj juanoj, fen-o, fen-oj)
EUR:(\D+) $(\1: eŭro, eŭroj, cendo, cendoj)
GBP:(\D+) $(\1: sterlinga pundo, sterlingaj pundoj, penco, pencoj)
JPY:(\D+) $(\1: japana eno, japanaj enoj, seno, senoj)
USD:(\D+) $(\1: usona dolaro, usonaj dolaroj, cendo, cendoj)

"([A-Z]{3}) ([-−]?1)" $2$(\1:us)
"([A-Z]{3}) ([-−]?\d+)" $2$(\1:up)

"(([A-Z]{3}) [-−]?\d+)[.,](01)" $1 |$(1)$(\2:ss)
"(([A-Z]{3}) [-−]?\d+)[.,](\d)" $1 |$(\30)$(\2:sp)
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1 |$3$(\2:sp)

== ordinal ==

([-−]?\d+)	$1a

== ordinal-number ==

(\d+)	\1.

== help ==

"" $(1), $(2), $(3)\n$(help ordinal)$(help ordinal-number)
(ordinal(-number)?) \1: $(\1 1), $(\1 2), $(\1 3)\n
`
modules['es']=`
^0 cero
1$ uno
1 un
2 dos
3 tres
4 cuatro
5 cinco
6 seis
7 siete
8 ocho
9 nueve
10 diez
11 once
12 doce
13 trece
14 catorce
15 quince
16 dieciséis
1(\d) dieci$1
20 veinte
22 veintidós
23 veintitrés
26 veintiséis
2(\d) veinti$1
30 treinta
40 cuarenta
50 cincuenta
60 sesenta
70 setenta
80 ochenta
90 noventa
(\d)(\d) $(\10) y $2
1(\d\d) cien[to $1]
500 quinientos
700 setecientos
900 novecientos
([579])(\d\d) $(\100) $2
(\d)(\d\d) $1cientos[ $2]
1(\d{3}) mil[ $1]
(\d{1,3})(\d{3}) $1 mil[ $2]
1(\d{6}) un millón[ $1]
(\d{1,6})(\d{6}) $1 millones[ $2]
1(\d{12}) un billón[ $1]
(\d{1,6})(\d{12}) $1 billones[ $2]
1(\d{18}) un trillón[ $1]
(\d{1,6})(\d{18}) $1 trillones[ $2]
1(\d{24}) un cuatrillón[ $1]
(\d{1,6})(\d{24}) $1 cuatrillones[ $2]
1(\d{30}) un quintillón[ $1]
(\d{1,6})(\d{30}) $1 quintillones[ $2]

# negative number

[-−](\d+) menos |$1

# decimals

([-−]?\d+)[.] $1| punto
([-−]?\d+)[,] $1| coma
([-−]?\d+[.,])([^0]\d) $1| |$2
([-−]?\d+[.,])(\d)(\d)(\d) |$1 |$2| |$3| |$4
([-−]?\d+[.,]\d*)(\d) $1| |$2

# currency

# unit/subunit singular/plural

us:([^,]*),([^,]*),([^,]*),([^,]*) \1
up:([^,]*),([^,]*),([^,]*),([^,]*) \2
ss:([^,]*),([^,]*),([^,]*),([^,]*) \3
sp:([^,]*),([^,]*),([^,]*),([^,]*) \4

ARS:(\D+) $(\1: peso argentino, pesos argentinos, centavo, centavos)
BOB:(\D+) $(\1: boliviano, bolivianos, centavo, centavos)
BZD:(\D+) $(\1: dólar beliceño, dólares beliceños, centavo, centavos)
CEC:(\D+) $(\1: peso convertible, pesos convertibles, centavo, centavos)
CHF:(\D+) $(\1: franco suizo, francos suizos, céntimo, céntimos)
CLP:(\D+) $(\1: peso chileno, pesos chilenos, centavo, centavos)
CNY:(\D+) $(\1: yuan renminbi, yuan renminbi, fen, fen)
COP:(\D+) $(\1: peso colombiano, pesos colombianos, centavo, centavos)
CRC:(\D+) $(\1: colón costarricense, colones costarricenses, céntimo, céntimos)
DOP:(\D+) $(\1: peso dominicano, pesos dominicanos, centavo, centavos)
ESP:(\D+) $(\1: peseta, pesetas, céntimo, céntimos)
EUR:(\D+) $(\1: euro, euros, céntimo, céntimos)
GBP:(\D+) $(\1: libra esterlina, libras esterlinas, penique, peniques)
GTQ:(\D+) $(\1: quetzal, quetzales, centavo, centavos)
HLN:(\D+) $(\1: lempira, lempiras, centavo, centavos)
JPY:(\D+) $(\1: yen, yenes, sen, sen)
MXN:(\D+) $(\1: peso mexicano, pesos mexicanos, centavo, centavos)
NIO:(\D+) $(\1: córdoba, córdobas, centavo, centavos)
PEN:(\D+) $(\1: sol, soles, centavo, centavos)
PYG:(\D+) $(\1: guaraní, guaraníes, céntimo, céntimos)
USD:(\D+) $(\1: dólar estadounidense, dólares estadounidenses, centavo, centavos)
UYU:(\D+) $(\1: peso uruguayo, pesos uruguayos, centésimo, centésimos)
VEF:(\D+) $(\1: bolívar fuerte, bolívares fuertes, céntimo, céntimos)

# masculine to feminine conversion of "un" after millions,
# if "as?$" matches currency name

f:(.*ill)(.*),(.*) \1$(f:\2,\3)		# don't modify un in millions
f:(.*un)([^a].*,|,)(.*as?) $(f:\1a\2\3)	# un libra -> una libra
f:(.*ient)o(s.*),(.*as?) $(f:\1a\2,\3)  # doscientos libra/libras -> doscientas
f:(.*),(.*) \1\2

"([A-Z]{3}) ([-−]?[01])([.,]00?)?"$(f:|$2,$(\1:us))
"([A-Z]{3}) ([-−]?\d+0{6,})([.,]00?)?" $2 de$(\1:up)
"([A-Z]{3}) ([-−]?\d+)([.,]00?)?"$(f:|$2,$(\1:up))

"(CNY [-−]?\d+)[.,]10?" $1 $2 jiao
"(CNY [-−]?\d+)[.,](\d)0?" $1 $2 jiao
"(CNY [-−]?\d+[.,]\d)1" $1 $2 fen
"(CNY [-−]?\d+[.,]\d)(\d)" $1 $2 fen

"(([A-Z]{3}) [-−]?\d+)[.,](01)" $1 con |$(1)$(\2:ss)
"(([A-Z]{3}) [-−]?\d+)[.,](\d)" $1 con |$(\30)$(\2:sp)
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1 con |$3$(\2:sp)

# ordinal

feminine:(.*un)o \1a
feminine:(.*) \1

== feminine ==

(.*)	$(feminine:|$1|)

== masculine ==

1 un
(.*)	$1

== ordinal-masculine ==

(.*) $(ordinal \1)

== ordinal ==

1 primero
2 segundo
3 tercero
4 cuarto
5 quinto
6 sexto
7 séptimo
8 octavo
9 noveno
10 décimo
1([1-79])	decimo$(ordinal \1)
18 decimoctavo
20 vigésimo
2(\d) vigesimo$(ordinal \1)
30 trigésimo
40 cuadragésimo
50 quincuagésimo
60 sexagésimo
70 septuagésimo
80 octogésimo
90 nonagésimo
(\d)(\d) $(ordinal \10) $(ordinal \2)
100 centésimo
200 ducentésimo
300 tricentésimo
400 cuadringentésimo
500 quingentésimo
600 sexcentésimo
700 septingentésimo
800 octingentésimo
900 noningentésimo
(\d)(\d\d) $(ordinal \100) $(ordinal \2)
1(\d{3}) milésimo[ $(ordinal \1)]
(\d{1,3})(\d{3}) $1 milésimo[ $(ordinal \2)]
1(\d{6}) millonésimo[ $(ordinal \1)]
(\d{1,3})(\d{6}) $1 millonésimo[ $(ordinal \2)]
1(\d{9}) milmillonésimo[ $(ordinal \1)]
(\d{1,3})(\d{9}) $1 milmillonésimo[ $(ordinal \2)]

== ordinal-feminine ==

([-−]?\d+) $(ordinal-feminine $(ordinal-masculine \1))
(.*)o\b(.*)  $(ordinal-feminine \1a\2)
(.*)   \1

== ordinal-masculine-adjective ==

([-−]?\d+) $(ordinal-masculine-adjective $(ordinal-masculine \1))
(.*)decimoprimero \1undécimo
(.*)decimosegundo \1duodécimo
(.*(primer|tercer))o \1
(.*) \1

# ordinal abbreviation

== (ordinal)-number-(feminine|masculine|masculine-adjective) ==

([-−]?\d+) \3$(ordinal-number-feminine $(\1-\2 \3))
.*er .ᵉʳ
.*a .ª
.*o .º

== help ==

"" $(1)|, $(2), $(3)\n$(\0 feminine)$(\0 masculine)$(\0 ordinal-number-masculine)$(\0 ordinal-number-masculine-adjective)$(\0 ordinal-number-feminine)$(\0 ordinal-feminine)$(\0 ordinal-masculine)$(\0 ordinal-masculine-adjective)
(feminine|masculine|ordinal(-number)?(-feminine|-masculine)?(-adjective)?) \1: $(\1 1), $(\1 2), $(\1 3)\n
`
modules['fi']=`
^0 nolla
1 yksi
2 kaksi
3 kolme
4 neljä
5 viisi
6 kuusi
7 seitsemän
8 kahdeksan
9 yhdeksän
10 kymmenen
1(\d) $1toista
(\d)(\d) $1kymmentä$2
1(\d\d) sata$1
(\d)(\d\d) $1sataa$2
1(\d{3}) tuhat$1
(\d)(\d{3}) $1tuhatta$2
(\d{2,3})(\d{3}) $1tuhatta[ $2]
1(\d{6}) miljoona[ $1]
(\d{1,3})(\d{6}) $1 miljoonaa[ $2]
1(\d{9}) miljardi[ $1]
(\d{1,3})(\d{9}) $1 miljardia[ $2]
1(\d{12}) biljoona[ $1]
(\d{1,3})(\d{12}) $1 biljoonaa[ $2]
1(\d{15}) tuhat biljoona[ $1]
(\d{1,3})(\d{15}) $1 tuhat biljoonaa[ $2]
1(\d{18}) triljoona[ $1]
(\d{1,3})(\d{18}) $1 triljoonaa[ $2]
1(\d{21}) tuhat triljoona[ $1]
(\d{1,3})(\d{21}) $1 tuhat triljoonaa[ $2]
1(\d{24}) kvadriljoona[ $1]
(\d{1,3})(\d{24}) $1 kvadriljoonaa[ $2]

# negative numbers

[-−](\d+) miinus |$1

# decimals

([-−]?\d+)[.,]([01])	|$1| ja |$2 kymmenesosa
([-−]?\d+)[.,](\d)	|$1| ja |$2 kymmenesosaa
([-−]?\d+)[.,]0([01])	|$1| ja |$2 sadasosa
([-−]?\d+)[.,](\d\d)	|$1| ja |$2 sadasosaa
([-−]?\d+)[.,]00([01])	|$1| ja |$2 tuhannesosa
([-−]?\d+)[.,](\d\d\d)	|$1| ja |$2 tuhannesosaa
"([-−]?\d+)[.,](\d)(\d)(\d)(\d)" |$1| ja |$2| |$3| |$4| |$5|
"([-−]?\d+[.,]\d+)(\d)" $1 |$2|

# currency

# unit/subunit singular/singular partitive

us:([^,]*),([^,]*),([^,]*),([^,]*) \1
up:([^,]*),([^,]*),([^,]*),([^,]*) \2
ss:([^,]*),([^,]*),([^,]*),([^,]*) \3
sp:([^,]*),([^,]*),([^,]*),([^,]*) \4

AUD:(\D+) $(\1: Australian dollari, Australian dollaria, sentti, senttiä)
CAD:(\D+) $(\1: Kanadan dollari, Kanadan dollaria, sentti, senttiä)
CHF:(\D+) $(\1: Sveitsin frangi, Sveitsin frangia, rappeni, rappenia)
CNY:(\D+) $(\1: juan renminbi, juan renminbia, feni, feniä)
CYP:(\D+) $(\1: Kyproksen punta, Kyproksen puntaa, sentti, senttiä)
CZK:(\D+) $(\1: Tšekin kruunu, Tšekin kruunua, haléři, haléřia)
DKK:(\D+) $(\1: Tanskan kruunu, Tanskan kruunua, äyri, äyriä)
EEK:(\D+) $(\1: Viron kruunu, Viron kruunua, sentti, senttiä)
EUR:(\D+) $(\1: euro, euroa, sentti, senttiä)
GBP:(\D+) $(\1: Englannin punta, Englannin puntaa, penni, pennia)
HKD:(\D+) $(\1: Hongkongin dollari, Hongkongin dollaria, sentti, senttiä)
HRK:(\D+) $(\1: Kroatian kuna, Kroatian kunaa, lipa, lipaa)
HUF:(\D+) $(\1: Unkarin forintti, Unkarin forinttia, filléri, fillériä)
IDR:(\D+) $(\1: Indonesian rupia, Indonesian rupiaa, seni, seniä)
ISK:(\D+) $(\1: Islannin kruunu, Islannin kruunua, äyri, äyriä)
JPY:(\D+) $(\1: Japanin jeni, Japanin jenia, seni, seniä)
KRW:(\D+) $(\1: Etelä-Korean won, Etelä-Korean won, chon, chonia)
LTL:(\D+) $(\1: Liettuan lita, Liettuan litiä, centasi, centasia)
LVL:(\D+) $(\1: Latvian lati, Latvian latia, santiimi, santiimia)
MYR:(\D+) $(\1: Malesian ringgit, Malesian ringgit, sentti, senttiä)
NZD:(\D+) $(\1: Uuden-Seelannin dollari, Uuden-Seelannin dollaria, sentti, senttiä)
NOK:(\D+) $(\1: Norjan kruunu, Norjan kruunua, äyri, äyriä)
PHP:(\D+) $(\1: Filippiinien peso, Filippiinien peso, centavo, centavoa)
PLN:(\D+) $(\1: Puolan złoty, Puolan złotya, groszy, groszya)
RON:(\D+) $(\1: Romanian leu, Romanian leu, bani, bania)
RUB:(\D+) $(\1: Venäjän rupla, Venäjän ruplaa, kopeekka, kopeekkaa)
SEK:(\D+) $(\1: Ruotsin kruunu, Norjan kruunua, äyri, äyriä)
SGD:(\D+) $(\1: Singaporen dollari, Singaporen dollaria, sentti, senttiä)
THB:(\D+) $(\1: Thaimaan baht, Thaimaan bahtia, satang, satangia)
TRY:(\D+) $(\1: Turkin liira, Turkin liiraa, kuruşi, kuruşia)
USD:(\D+) $(\1: USA:n dollari, USA:n dollaria, sentti, senttiä)

"(JPY [-−]?\d+)[.,](\d\d)0" $1
"(JPY [-−]?\d+[.,]\d\d)1" $1 $2 rini
"(JPY [-−]?\d+[.,]\d\d)(\d)" $1 $2 riniä

"([A-Z]{3}) ([-−]?1)([.,]00?)?" $2$(\1:us)
"([A-Z]{3}) ([-−]?\d+)([.,]00?)?" $2$(\1:up)

# chiao?
"(CNY [-−]?\d+)[.,]10?" $1 $2 chiao
"(CNY [-−]?\d+)[.,](\d)0?" $1 $2 chiaota
"(CNY [-−]?\d+[.,]\d)1" $1 $2 feni
"(CNY [-−]?\d+[.,]\d)(\d)" $1 $2 feniä

"(([A-Z]{3}) [-−]?\d+)[.,](01)" $1 $(1)$(\2:ss)
"(([A-Z]{3}) [-−]?\d+)[.,](\d)" $1 $(\30)$(\2:sp)
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1 $3$(\2:sp)

== ordinal ==

^0 nolla
1 ensimmäinen
2$ toinen
2 kahdes
3 kolmas
4 neljäs
5 viides
6 kuudes
7 seitsemäs
8 kahdeksas
9 yhdeksäs
10 kymmenes
11 yhdestoista
12 kahdestoista
1(\d) $(ordinal \1)toista
(\d)(\d) $(ordinal \1)kymmenes$(ordinal \2)
1(\d\d) sadas$(ordinal \1)
(\d)(\d\d) $(ordinal \1)sadas$(ordinal \2)
1(\d{3}) tuhannes$(ordinal \1)
(\d)(\d{3}) $(ordinal \1)tuhannes$(ordinal \2)
(\d{2,3})(\d{3}) $(ordinal \1)|tuhannes[ $(ordinal \2)]
(\d)(\d{6}) $(ordinal \1)miljoonas[ $(ordinal \2)]
(\d{2,3})(\d{6}) $(ordinal \1)| miljoonas[ $(ordinal \2)]
(\d)(\d{6}) $(ordinal \1)miljoonas[ $(ordinal \2)]
(\d{2,3})(\d{6}) $(ordinal \1)| miljoonas[ $(ordinal \2)]
(\d)(\d{9}) $(ordinal \1)miljardis[ $(ordinal \2)]
(\d{2,3})(\d{9}) $(ordinal \1)| miljardis[ $(ordinal \2)]
(\d)(\d{12}) $(ordinal \1)biljoonas[ $(ordinal \2)]
(\d{2,3})(\d{12}) $(ordinal \1)| biljoonas[ $(ordinal \2)]

== ordinal-number ==

(\d+)	\1.

== help ==

"" $(1), $(2), $(3)\n$(help ordinal)$(help ordinal-number)
(ordinal(-number)?) \1: $(\1 1), $(\1 2), $(\1 3)\n
`
modules['fr']=`
^0 zéro
1 un
2 deux
3 trois
4 quatre
5 cinq
6 six
7 sept
8 huit
9 neuf
10 dix
11 onze
12 douze
13 treize
14 quatorze
15 quinze
16 seize
20 vingt
30 trente
40 quarante
50 cinquante
60 soixante

71 septante et un		# [:fr-CH:] [:fr-BE:]
7(\d) septante[-$1]		# [:fr-CH:] [:fr-BE:]
71 soixante et onze		# default
7(\d) soixante-$(1\1)		# default

81 huitante et un		# [:fr-CH:]
8(\d) huitante[-$1]		# [:fr-CH:]
80$ quatre-vingts		# default
80 quatre-vingt			# default
81 quatre-vingt-un		# default

91 nonante et un		# [:fr-CH:] [:fr-BE:]
9(\d) nonante[-$1]		# [:fr-CH:] [:fr-BE:]
9(\d) quatre-vingt-$(1\1)	# default

(\d)1 $(\10) et un
(\d)(\d) $(\10)-$2

1(\d\d) cent[ $1]
(\d)00$ $1 cents
(\d)(\d\d) $1 cent[ $2]
1100 onze cents
11(\d\d) onze cent[ $1]
1(\d{3}) mille[ $1]
(\d{1,3})(\d{3}) $1 mille[ $2]
1(\d{6}) un million[ $1]
(\d{1,3})(\d{6}) $1| millions[ $2]
1(\d{9}) un milliard[ $1]
(\d{1,3})(\d{9}) $1| milliards[ $2]
1(\d{12}) un billion[ $1]
(\d{1,3})(\d{12}) $1| billions[ $2]
1(\d{15}) un billiard[ $1]
(\d{1,3})(\d{15}) $1| billiards[ $2]
1(\d{18}) un trillion[ $1]
(\d{1,3})(\d{18}) $1| trillions[ $2]
1(\d{21}) un trilliard[ $1]
(\d{1,3})(\d{21}) $1| trilliards[ $2]
1(\d{24}) un quadrillion[ $1]
(\d{1,3})(\d{24}) $1| quadrillions[ $2]

# negative number

[-−](\d+) moins |$1

# decimals

"([-−]?\d+)[.,]" "$1| virgule"
"([-−]?\d+[.,]0*)(\d+)" $1 |$2

# currency

# unit/subunit singular/plural

us:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \1
up:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \2
ud:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \3
ss:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \4
sp:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \5

# masculine/feminine

mf:.*un(e?) \1

BIF:(\D+) $(\1: franc burundais, francs burundais, de francs burundais, centime, centimes, un)
CAD:(\D+) $(\1: dollar canadien, dollars canadiens, de dollars canadiens, cent, cents, un)
CDF:(\D+) $(\1: franc congolais, francs congolais, de francs congolais, centime, centimes, un)
CHF:(\D+) $(\1: franc suisse, francs suisses, de francs suisses, centime, centimes, un)
DJF:(\D+) $(\1: franc de Djibouti, francs de Djibouti, de francs de Djibouti, centime, centimes, un)
DZD:(\D+) $(\1: dinar algérien, dinars algériens, de dinars algériens, centime, centimes, un)
EUR:(\D+) $(\1: euro, euros, d’euros, centime, centimes, un)
GBP:(\D+) $(\1: livre sterling, livres sterling, de livres sterling, penny, pennies, une)
GNF:(\D+) $(\1: franc guinéen, francs guinéens, de francs guinéens,,, un)
HTF:(\D+) $(\1: gourde, gourde, de gourde, centime, centimes, une)
KMF:(\D+) $(\1: franc des Comores, francs des Comores, de francs des Comores, centime, centimes, un)
LBP:(\D+) $(\1: livre libanaise, livres libanaises, de livres libanaises,,, une)
MAD:(\D+) $(\1: dirham marocain, dirhams marocains, de dirhams marocains, centime, centimes, un)
MGA:(\D+) $(\1: ariary, ariarys, d’ariarys, iraimbilanja, iraimbilanja, un)
MRO:(\D+) $(\1: ouguiya, ouguiya, d’ouguiya, khoum, khoums, un)
MUR:(\D+) $(\1: roupie mauricienne, roupies mauriciennes, de roupies mauriciennes, cent, cents, une)
RWF:(\D+) $(\1: franc rwandais, francs rwandais, de francs rwandais, centime, centimes, un)
SCR:(\D+) $(\1: roupie seychelloise, roupies seychelloises, de roupies seychelloise, cent, cents, une)
TND:(\D+) $(\1: dinar tunisien, dinars tunisiens, de dinars tunisiens, millime, millimes, un)
USD:(\D+) $(\1: dollar américain, dollars américains, de dollars américains, cent, cents, un)
VUV:(\D+) $(\1: vatu, vatus, de vatus,,, un)
X[AO]F:(\D+) $(\1: franc CFA, francs CFA, de francs CFA, centime, centimes, un)
XPF:(\D+) $(\1: franc Pacifique, francs Pacifique, de francs Pacifique, centime, centimes, un)

"(GNF|LBP|VUV) ([-−]?[01](.0+)?)" $2$(\1:us)
"(GNF|LBP|VUV) ([-−]?\d+0{6,})" $2$(\1:ud)
"(GNF|LBP|VUV) ([-−]?\d+[.,]\d+)" $2$(\1:up)

"([A-Z]{3}) ([-−]?1)([.,]00?)?" $2$(\1:mf)$(\1:us)              # un/une
"([A-Z]{3}) ([-−]?\d*[02-9]1)([.,]00?)?" $2$(\1:mf)$(\1:up)     # cent un/une mais pas cent onze
"([A-Z]{3}) ([-−]?[0])([.,]00?)?" $2$(\1:us)
"([A-Z]{3}) ([-−]?\d+0{6,})([.,]00?)?" $2$(\1:ud)
"([A-Z]{3}) ([-−]?\d+)([.,]00?)?" $2$(\1:up)

"((MGA|MRO) [-−]?\d+)[.,]0" $1
"((MGA|MRO) [-−]?\d+)[.,]2" $1 et |$(1)$(\2:ss)
"((MGA|MRO) [-−]?\d+)[.,]4" $1 et |$(2)$(\2:sp)
"((MGA|MRO) [-−]?\d+)[.,]6" $1 et |$(3)$(\2:sp)
"((MGA|MRO) [-−]?\d+)[.,]8" $1 et |$(4)$(\2:sp)

"((TND) [-−]?\d+)[.,](001)" $1 et |$(1)$(\2:ss)
"((TND) [-−]?\d+)[.,](\d)" $1 et |$(\300)$(\2:sp)
"((TND) [-−]?\d+)[.,](\d\d)" $1 et |$(\30)$(\2:sp)
"((TND) [-−]?\d+)[.,](\d\d\d)" $1 et |$3$(\2:sp)

"(([A-Z]{3}) [-−]?\d+)[.,](01)" $1 et |$(1)$(\2:ss)
"(([A-Z]{3}) [-−]?\d+)[.,](\d)" $1 et |$(\30)$(\2:sp)
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1 et |$3$(\2:sp)

== ordinal-feminine ==

1		première

== ordinal(-feminine|-masculine)? ==

1		premier
([-−]?\d+)	$(ordinal |$2)

(.*)e		\2ième	# quatre etc.
(.*)f		\2vième	# neuf
(.*q)		\2uième	# cinq
(.*)		\2ième	# others

== ordinal-number-feminine ==

1	1ʳᵉ

== ordinal-number(-feminine|-masculine)? ==

1	1ᵉʳ
(\d+)	\2ᵉ

== help ==

"" $(1), $(2), $(3)\n$(help ordinal)$(help ordinal-feminine)$(help ordinal-masculine)$(help ordinal-number-feminine)$(help ordinal-number-masculine)
(ordinal(-feminine|-masculine|-number)?) \1: $(\1 1), $(\1 2), $(\1 3)\n
`
modules['he']=`
^0 אפס
1 אחת
2 שתיים
3 שלוש
4 ארבע
5 חמש
6 שש
7 שבע
8 שמונה
9 תשע
10 עשר
12 שתים-עשרה
1(\d) $1-עשרה

20 עשרים
50 חמישים
60 שישים
80 שמונים
(\d)0 $1ים

(\d)(\d) $(\10) ו$2

# separator after 1-2 hundred(s)
hs1:20 " ו"    # מאה ועשרים
hs1:(\d\d) $(hs:\1)

# separator after 3+ hundreds
hs:0+          # מאה
hs:[01]\d " ו" # מאה ועשר
hs:\d+ " "     # מאה שלושים וחמש

1(\d\d) מאה$(hs1:\1)$1
2(\d\d) מאתיים$(hs1:\1)$1
(\d)(\d\d) $(df:\1) מאות$(hs:\2)$2

# separator after thousands+
ts:0+          # אלף
ts:0+\d\d " ו" # אלף ושלושים
ts:\d+ " "     # אלף מאה שלושים

1(\d{3}) אלף$(ts:\1)$1
2(\d{3}) אלפיים$(ts:\1)$1
([3-9]|10)(\d{3}) $(dm2:\1) אלפים$(ts:\2)$2
(\d{1,3})(\d{3}) $(m:$1) אלף$(ts:\2)$2

1(\d{6}) מיליון$(ts:\1)$1
2(\d{6}) שני מיליונים$(ts:\1)$1
([3-9]|10)(\d{6}) $(m:$1) מיליונים$(ts:\2)$2
(\d{1,3})(\d{6}) $(m:$1) מיליון$(ts:\2)$2

1(\d{9}) מיליארד$(ts:\1)$1
2(\d{9}) שני מיליארדים$(ts:\1)$1
([3-9]|10)(\d{9}) $(m:$1) מיליארדים$(ts:\2)$2
(\d{1,3})(\d{9}) $(m:$1) מיליארד$(ts:\2)$2

1(\d{12}) טריליון$(ts:\1)$1
2(\d{12}) שני טריליונים$(ts:\1)$1
([3-9]|10)(\d{12}) $(m:$1) טריליונים$(ts:\2)$2
(\d{1,3})(\d{12}) $(m:$1) טריליון$(ts:\2)$2

1(\d{15}) קוודראליון$(ts:\1)$1
2(\d{15}) שני קוודראליונים$(ts:\1)$1
([3-9]|10)(\d{15}) $(m:$1) קוודראליונים$(ts:\2)$2
(\d{1,3})(\d{15}) $(m:$1) קוואדראליון$(ts:\2)$2

1(\d{18}) קווינטיליון$(ts:\1)$1
2(\d{18}) שני קווינטיליונים$(ts:\1)$1
([3-9]|10)(\d{18}) $(m:$1) קווינטיליונים$(ts:\2)$2
(\d{1,3})(\d{18}) $(m:$1) קווינטיליון$(ts:\2)$2

1(\d{21}) סקסטיליון$(ts:\1)$1
2(\d{21}) שני סקסטיליונים$(ts:\1)$1
([3-9]|10)(\d{21}) $(m:$1) סקסטיליונים$(ts:\2)$2
(\d{1,3})(\d{21}) $(m:$1) סקסטיליון$(ts:\2)$2

1(\d{24}) ספטיליון$(ts:\1)$1
2(\d{24}) שני ספטיליונים$(ts:\1)$1
([3-9]|10)(\d{24}) $(m:$1) ספטיליונים$(ts:\2)$2
(\d{1,3})(\d{24}) $(m:$1) ספטיליון$(ts:\2)$2


# negative number

[-−](\d+) מינוס |$1

# decimals

"([-−]?\d+)[.,]" $1| נקודה
"([-−]?\d+[.,])([1-9]\d)" $1| |$2
"([-−]?\d+[.,])(\d)(\d)(\d)" $1| |$2 |$3 |$4
"([-−]?\d+[.,]\d*)(\d)" $1| |$2

# feminine->masculine correction, as all numbers are given for feminine gender

m:(.*)אחת \1אחד
m:(.*)שתיים \1שניים
m:(.*)חמש \1חמישה
m:(.*)שש \1שישה
m:(.*)(שלוש|ארבע|שבע|תשע|עשר) \1\2ה

m:(.*)אחת-עשרה \1אחד-עשר
m:(.*)שתים-עשרה \1שנים-עשר
m:(.*)חמש-עשרה \1חמישה-עשר
m:(.*)שש-עשרה \1שישה-עשר
m:(.*)(שלוש|ארבע|שבע|תשע)-עשרה \1\2ה-עשר

[fm]:(.*) \1

# numbers dependent on what they count

df:(.*)2 $1שתי

dm:1 אחד
dm:2 שני

# more rarely used
dm2:8 שמונת
dm2:(\d|10) $1ת
dm2:(.*) $(dm:\1)

d([fm]):(1(0{24}|0{21}|0{18}|0{15}|0{12}|0{9}|0{6}|0{3})) $(m:$2)
d([fm]):20{24} שני ספטיליוני
d([fm]):(\d{1,3})0{24} $(m:$2) ספטיליוני
d([fm]):20{21} שני סקסטיליוני
d([fm]):(\d{1,3})0{21} $(m:$2) סקסטיליוני
d([fm]):20{18} שני קווינטיליוני
d([fm]):(\d{1,3})0{18} $(m:$2) קווינטיליוני
d([fm]):20{15} שני קוודראליוני
d([fm]):(\d{1,3})0{15} $(m:$2) קוודראליוני
d([fm]):20{12} שני טריליוני
d([fm]):(\d{1,3})0{12} $(m:$2) טריליוני
d([fm]):20{9} שני מיליארדי
d([fm]):(\d{1,3})0{9} $(m:$2) מיליארדי
d([fm]):20{6} שני מיליוני
d([fm]):(\d{1,3})0{6} $(m:$2) מיליוני
d([fm]):20{3} אלפיים
d([fm]):(\d{1,3})0{3} $(dm2:\2) אלפים
d([fm]):(.*) $(\1:$2)

# numbers independent on what they count

i([fm]):(.*)[.,](.*) $(\1:$2) נקודה 
i([fm]):(.*) $(\1:$2)


# currency

# gender unit, gender subunit, unit singular, unit, plural, subunit singular, subunit, plural

us(.).:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \2 $(\1:\6)
up(.).:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) $(\1:\6) \3
ss.(.):([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \4 $(\1:\6)
sp.(.):([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) $(\1:\6) \5

# "mm" means masculine unit and masculine subunit

CHF:(.+),(.+) $(\1mm:פרנק שוויצרי,פרנקים שוויצריים,סנט,סנטים,\2)
CNY:(.+),(.+) $(\1mm:יואן,יואנים,פן,פנים,\2)
EUR:(.+),(.+) $(\1mm:אירו,אירו,סנט,סנטים,\2)
GBP:(.+),(.+) $(\1fm:לירה סטרלינג,לירות סטרלינג,פני,פנים,\2)
ILS:(.+),(.+) $(\1mf:שקל,שקלים,אגורה,אגורות,\2)
JPY:(.+),(.+) $(\1mm:יין,יינים,סן,סנים,\2)
USD:(.+),(.+) $(\1mm:דולר ארה"ב,דולרים ארה"ב,סנט,סנטים,\2)

"([A-Z]{3}) ([-−]?1)([.,]00?)?" $(\1:us,|$(dm:\2))
"([A-Z]{3}) ([-−]?\d+)([.,]00?)?" $(\1:up,|$(dm:\2))

"(CNY [-−]?\d+)[.,]10?" $1| ז'יאו אחד
"(CNY [-−]?\d+)[.,](\d)0?" $1| $2| ז'יאו
"(CNY [-−]?\d+[.,]\d)1" $1| $2| פן
"(CNY [-−]?\d+[.,]\d)(\d)" $1| $2| פן

"(([A-Z]{3}) [-−]?\d+)[.,](01)" $1| ו$(\2:ss,$(1))
"(([A-Z]{3}) [-−]?\d+)[.,](\d)" $1| ו$(\2:sp,$(\30))
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1| ו$(\2:sp,$3)

# ordinal numbers: in hebrew, they depend on gender

# transform a number to a feminine ordinal

"ordinal-masculine (\d+)" $(ordm:\1)

ordm:1 ראשון
ordm:2 שני
ordm:3 שלישי
ordm:4 רביעי
ordm:5 חמישי
ordm:6 שישי
ordm:7 שביעי
ordm:8 שמיני
ordm:9 תשיעי
ordm:10 עשירי

# transform a number to a masculine ordinal

"ordinal-feminine (\d+)" $(ordf:\1)

ordf:1 ראשונה
ordf:2 שניה
ordf:([3-9]|10) $(ordm:\1)ת

# other numbers
ord([fm]):(\d+) $(\1:$2)

# from the end ;)
"ordinal-(f|m)(eminine|asculine) [-−]?(\d+)" $(ord\1:\2) מהסוף

# ordinal abbreviation: no such thing
"ordinal-number(-feminine|-masculine)? ([-−]?\d+)" $(ordinal\1 \2)

# masculine assumption
"ordinal ([-−]?\d+)" $(ordinal-masculine \1)

help פונקציות נוספות:\nord, ordm \(מספר סידורי זכר, כגון "ראשון"\)\nordf \(מספר סידורי נקבה, כגון "ראשונה"\)
`
modules['hu']=`
^0 nulla
1 egy
2$ kettő
2 két
3 három
4 négy
5 öt
6 hat
7 hét
8 nyolc
9 kilenc
10 tíz
1(\d) tizen$1
20 húsz
2(\d) huszon$1
3(\d) harminc$1
4(\d) negyven$1
5(\d) ötven$1
6(\d) hatvan$1
7(\d) hetven$1
8(\d) nyolcvan$1
9(\d) kilencven$1
1(\d\d) száz$1
(\d)(\d\d) $1száz$2
11(\d{2}) ezeregy$(1\1)
1(\d{3}) ezer$1

(\d{1,3})(\d{3}) $1ezer[-$2]
(\d{1,3})(\d{6}) $1millió[-$2]
(\d{1,3})(\d{9}) $1milliárd[-$2]
(\d{1,3})(\d{12}) $1billió[-$2]
(\d{1,3})(\d{15}) $1billiárd[-$2]
(\d{1,3})(\d{18}) $1trillió[-$2]
(\d{1,3})(\d{21}) $1trilliárd[-$2]

# negative numbers

[-−](\d+) mínusz |$1

# decimals

"([-−]?\d+)[.,](\d)" |$1| egész |$2 tized
"([-−]?\d+)[.,](\d\d)" |$1| egész |$2 század
"([-−]?\d+)[.,](\d{3})" |$1| egész |$2 ezred
"([-−]?\d+)[.,](\d)(\d)(\d)(\d)" |$1| egész |$2| |$3| |$4| |$5|
"([-−]?\d+[.,]\d+)(\d)" $1 |$2|

# currency

# unit/subunit

u:([^,]*),([^,]*)	\1
s:([^,]*),([^,]*)	\2

AUD:(.)	$(\1: ausztrál dollár, cent)
BGN:(.)	$(\1: bolgár leva, sztotinka)
BRL:(.)	$(\1: brazil real, centavo)
CAD:(.)	$(\1: kanadai dollár, cent)
CHF:(.)	$(\1: svájci frank, rappen)
CNY:(.)	$(\1: kínai jüan, fen)
CZK:(.)	$(\1: cseh korona, haléř)
DKK:(.)	$(\1: dán korona, øre)
EEK:(.)	$(\1: észt korona, sent)
EUR:(.)	$(\1: euró, cent)
GBP:(.)	$(\1: font sterling, penny)
HKD:(.)	$(\1: hongkongi dollár, cent)
HRK:(.)	$(\1: horvát kuna, lipa)
HUF:(.)	$(\1: forint, fillér)
ISK:(.)	$(\1: izlandi korona, eyrir)
JPY:(.)	$(\1: japán jen, szen)
KRW:(.)	$(\1: dél-koreai von, cson)
LTL:(.)	$(\1: litván litas, centas)
LVL:(.)	$(\1: lett lat, santīm)
MXN:(.)	$(\1: mexikói peso, centavo)
NOK:(.)	$(\1: norvég korona, øre)
NZD:(.)	$(\1: új-zélandi dollár, cent)
PLN:(.)	$(\1: lengyel złoty, grosz)
RON:(.)	$(\1: román lej, bani)
RSD:(.)	$(\1: szerb dinár, para)
RUB:(.)	$(\1: orosz rubel, kopejka)
SEK:(.)	$(\1: svéd korona, öre)
SGD:(.)	$(\1: szingapúri dollár, cent)
TRY:(.)	$(\1: török líra, kuruş)
UAH:(.)	$(\1: ukrán hrivnya, kopijka)
USD:(.)	$(\1: USA-dollár, cent)
ZAR:(.)	$(\1: dél-afrikai rand, cent)

"(JPY [-−]?\d+)[.,](\d\d)0" $1
"(JPY [-−]?\d+[.,]\d\d)(\d)" $1 $2 rin

"([A-Z]{3}) ([-−]?\d+)([.,]00?)?" $2$(\1:u)

"(CNY [-−]?\d+)[.,](\d)0?" $1 $2 jiao
"(CNY [-−]?\d+[.,]\d)(\d)" $1 $2 fen

"(([A-Z]{3}) [-−]?\d+)[.,](\d)" $1 $(\30)$(\2:s)
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1 $3$(\2:s)

# Article a/az

"(article |cardinal |formal ){3}(([a-zA-Z]+ )*1\d{2}([.,]\d*)?)" az $(formal \2)
"(article |cardinal ){2}(([a-zA-Z]+ )*1(\d{3})*([.,]\d*)?)" az $2
"(article |cardinal ){2}(([a-zA-Z]+ )*5.*)" az $2
"(article |cardinal ){2}(.*)" a $2

== article ==

(1(\d{3}|\d{6})*) az \1
(5.*) az \1
(.*) a \1

== ordinal ==

1 első
2 második
"(([a-zA-Z]+ )*[-−]?\d+)" $(ordinal $1)

(.*)nulla	\1nulladik
(.*)egy	\1egyedik
(.*)kettő	\1kettedik
(.*)három	\1harmadik
(.*)négy	\1negyedik
(.*)öt	\1ötödik
(.*)hat	\1hatodik
(.*)hét	\1hetedik
(.*)nyolc	\1nyolcadik
(.*)kilenc	\1kilencedik
(.*)tíz	\1tizedik
(.*)húsz	\1huszadik
(.*)harminc	\1harmincadik
(.*)(negy|öt|het|kilenc)ven	\1\2venedik
(.*)(hat|nyolc)van	\1\2vanadik
(.*)száz	\1századik
(.*)ezer	\1ezredik
(.*)illió	\1illiomodik
(.*)illiárd	\1illiárdodik

== formal ==

"(([a-zA-Z]+ )*[-−]?\d+([.,]\d*)?)" $(formal |$1)
(|.*-)((száz|ezer).*) $(formal \1egy\2)
(.*)két(.*) $(formal \1kettő\2)
(.*) \1

== year ==

# no hyphen in numbers

"(([a-zA-Z]+ )*[-−]?\d+)" $(year |$1)
(.*)-(.*) $(year \1\2)
(.*) \1

== cardinal ==

(.*) $1

== ordinal-number ==

(.*) \1.

== text ==

(\d|10) $1
(\d{2,4}) \1
(\d{2,3})(\d{3}) \1 ezer[ $(text \2)]
(\d{1,3})(\d{6}) \1 millió[ $(text \2)]
(\d{1,4})(\d{9}) \1 milliárd[ $(text \2)]
(\d{1,4})(\d{12}) \1 billió[ $(text \2)]
(\d{1,4})(\d{15}) \1 billiárd[ $(text \2)]

== help ==

"" $(1)|, $(2)|, $(3)\n$(\0 ordinal)$(\0 ordinal-number)year: $(year 2001), $(year 2002)|, $(year 2003)\nformal: $(formal 100), $(formal 200), $(formal 1000)\ntext: $(text 1), $(text 12000), $(text 10000000000)\ncurrency \(for example, HUF\): $(HUF 2,5)\nformal HUF: $(formal HUF 102,5)
"(ordinal(-number)?|USD)" \1: $(\1 1), $(\1 2), $(\1 3)\n

`
modules['id']=`
^0 nol
1 satu
2 dua
3 tiga
4 empat
5 lima
6 enam
7 tujuh
8 delapan
9 sembilan
10 sepuluh
11 sebelas
1(\d) $1 belas
(\d)(\d) $1 puluh[ $2]
1(\d\d) seratus[ $1]
(\d)(\d\d) $1 ratus[ $2]
1(\d{3}) seribu[ $1]
(\d{1,3})(\d{3}) $1 ribu[ $2]
# sejuta or setu juta etc.
(\d{1,3})(\d{6}) $1 juta[ $2]
(\d{1,3})(\d{9}) $1 miliar[ $2]
(\d{1,3})(\d{12}) $1 triliun[ $2]
(\d{1,3})(\d{15}) $1 kuadriliun[ $2]
(\d{1,3})(\d{18}) $1 kuantiliun[ $2]
(\d{1,3})(\d{21}) $1 sextiliun[ $2]
(\d{1,3})(\d{24}) $1 septiliun[ $2]

# negative numbers

[-−](\d+) minus |$1

# decimals

"([-−]?\d+)[.,]" $1| koma
"([-−]?\d+[.,]\d*)(\d)" $1| |$2

# currency

# unit/subunit

u:(.*),(.*)	\1
s:(.*),(.*)	\2

AUD:(.)	$(\1: dollar Australia, sen)
BGN:(.)	$(\1: lev, leva, stotinka, stotinki)
BWP:(.)	$(\1: pula, pula, thebe, thebe)
CAD:(.)	$(\1: dollar Kanada, sen)
CHF:(.)	$(\1: franc Swiss, sen)
CNY:(.)	$(\1: yuan, fen)
CZK:(.)	$(\1: koruna Czech, koruna Czech, halér, halére)
EEK:(.)	$(\1: kroon, kroonid, sen)
EUR:(.)	$(\1: euro, sen)
GBP:(.)	$(\1: pound sterling, penny)
GHS:(.)	$(\1: cedi Ghana, pesewas)
GMD:(.)	$(\1: dalasi, bututs)
HKD:(.)	$(\1: dollar Hongkong, sen)
IDR:(.)	$(\1: rupiah, sen)
INR:(.)	$(\1: rupee India, paisa)
JMD:(.)	$(\1: dollar Jamaika, sen)
JPY:(.)	$(\1: yen, sen)
KRW:(.)	$(\1: won, chon)
KES:(.)	$(\1: shilling Kenya, sen)
LRD:(.)	$(\1: dollar Liberia, sen)
LSL:(.)	$(\1: loti, sente)
LTL:(.)	$(\1: litas, sen)
LVL:(.)	$(\1: lats, sen)
MGA:(.)	$(\1: ariary, iraimbilanja)
MUR:(.)	$(\1: rupee Mauritius, sen)
MXN:(.)	$(\1: peso Meksiko, centavo)
MWK:(.)	$(\1: kwacha Malawi, tambala)
NAD:(.)	$(\1: dollar Namibia, sen)
NGN:(.)	$(\1: naira, kobo)
NZD:(.)	$(\1: dollar New Zealand, sen)
PGK:(.)	$(\1: kina, toea)
PHP:(.)	$(\1: peso Filipina, centavo)
PKR:(.)	$(\1: rupee Pakistan, paisa)
PLN:(.)	$(\1: zloty, grosz)
RON:(.)	$(\1: leu Romania, ban)
RSD:(.)	$(\1: dinar Serbia, para)
RUB:(.)	$(\1: ruble Russia, kopek)
RWF:(.)	$(\1: franc Rwanda, centime)
SGD:(.)	$(\1: dollar Singapura, sen)
SLL:(.)	$(\1: leone, sen)
SZL:(.)	$(\1: lilangeni, sen)
THB:(.)	$(\1: baht, satang)
TRY:(.)	$(\1: lira Turki, kurus)
TTD:(.)	$(\1: dollar Trinidad dan Tobago, sen)
TZS:(.)	$(\1: shilling Tanzania,sen)
UAH:(.)	$(\1: hryvnia, kopiyka)
UGX:(.)	$(\1: shilling Uganda, sen)
USD:(.)	$(\1: dolar Amerika, sen)
ZAR:(.)	$(\1: rand Afrika Selatan, sen)
ZMK:(.)	$(\1: kwacha Zambia, ngwee)
ZWL:(.)	$(\1: dollar Zimbabwe, sen)

"(JPY [-−]?\d+)[.,](\d\d)0" $1
"(JPY [-−]?\d+[.,]\d\d)(\d)" $1 $2 rin

"([A-Z]{3}) ([-−]?\d+)([.,]00?)?" $2$(\1:u)

"(CNY [-−]?\d+)[.,](\d)0?" $1 $2 yiao
"(CNY [-−]?\d+[.,]\d)(\d)" $1 $2 fen

"(([A-Z]{3}) [-−]?\d+)[.,](\d)" $1 dan $(\30)$(\2:s)
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1 dan $3$(\2:s)

== ordinal ==

1		pertama
(\d+)		$(ordinal ke$1)
"kesatu (.*)"	kese\1
(.*)		\1

== ordinal-number ==

1	1
(\d+)	ke-\1

== help ==

"" $(1), $(2), $(3)\n$(help ordinal)$(help ordinal-number)
(ordinal(-number)?) \1: $(\1 1), $(\1 2), $(\1 3)\n
`
modules['it']=`
^0 zero
1 uno
2 due
^3$ tre
3$ tré
3 tre
4 quattro
5 cinque
6 sei
7 sette
8 otto
9 nove
10 dieci
11 undici
12 dodici
13 tredici
14 quattordici
15 quindici
16 sedici
17 diciassette
18 diciotto
19 diciannove
2([18]) vent$1
2(\d) venti$1
3([18]) trent$1
3(\d) trenta$1
4([18]) quarant$1
4(\d) quaranta$1
5([18]) cinquant$1
5(\d) cinquanta$1
6([18]) sessant$1
6(\d) sessanta$1
7([18]) settant$1
7(\d) settanta$1
8([18]) ottant$1
8(\d) ottanta$1
9([18]) novant$1
9(\d) novanta$1
1(\d\d) cento$1
(\d)(\d\d) $1cento$2
1(\d{3}) mille$1
(\d{1,2})(\d{3}) $1mila$2
(\d{3})(\d{3}) $1mila[ $2]
1(\d{6}) un milione[ $1]
(\d{1,3})(\d{6}) $1 milioni[ $2]
1(\d{9}) un miliardo[ $1]
(\d{1,3})(\d{9}) $1 miliardi[ $2]
1(\d{12}) un bilione[ $1]
(\d{1,3})(\d{12}) $1 bilioni[ $2]
1(\d{15}) un biliardo[ $1]
(\d{1,3})(\d{15}) $1 biliardi[ $2]
1(\d{18}) un trilione[ $1]
(\d{1,3})(\d{18}) $1 trilioni[ $2]
1(\d{21}) un triliardo[ $1]
(\d{1,3})(\d{21}) $1 triliardi[ $2]

# negative numbers

[-−](\d+) meno |$1

# decimals

([-−]?\d+)[.,] $1| virgola
([-−]?\d+[.,])([^0]\d) $1| |$2
([-−]?\d+[.,])(\d)(\d)(\d) |$1 |$2| |$3| |$4
([-−]?\d+[.,]\d*)(\d) $1| |$2

# currencies
	
# unit/subunit

u:([^,]*),([^,]*),([^,]*)	\1
s:([^,]*),([^,]*),([^,]*)	\2
p:([^,]*),([^,]*),([^,]*)	\3

CHF:(.)	$(\1: franco svizzero, centesimo, centesimi)
CNY:(.)	$(\1: yuan renminbi, fen, fen)
EUR:(.)	$(\1: euro, centesimo, centesimi)
GBP:(.)	$(\1: lira sterlina, penny, pence)
JPY:(.)	$(\1: yen, sen, sen)
USD:(.)	$(\1: dollaro USA, cent, cent)

"(JPY [-−]?\d+)[.,](\d\d)0" $1
"(JPY [-−]?\d+[.,]\d\d)(\d)" $1 $2 rin

"([A-Z]{3}) ([-−]?\d+)([.,]00?)?" $2$(\1:u)

"(CNY [-−]?\d+)[.,](\d)0?" $1 $2 jiao
"(CNY [-−]?\d+[.,]\d)(\d)" $1 $2 fen

"(([A-Z]{3}) [-−]?\d+)[.,](01)" $1 uno$(\2:s)
"(([A-Z]{3}) [-−]?\d+)[.,](\d)" $1 $(\30)$(\2:p)
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1 $3$(\2:p)

== cardinal-feminine ==

1 una

== cardinal-masculine ==

1 un

== cardinal-(feminine|masculine) ==

(.*) $(\1 $2)

== feminine ==

(.*)uno \1una

== masculine ==

(.*)uno \1un

== (feminine|masculine) ==

(.*) \2

== ordinal-feminine ==

([-−]?\d+) $(ordinal-feminine |$1)
un[ao]	\1prima
due	\1seconda
tre	\1terza
quattro	\1quarta
cinque	\1quinta
sei	\1sesta
sette	\1settima
otto	\1ottava
nove	\1nona
dieci	\1decima
(.*tr)é \1eesima
(.*sei) \1esima
"(.*)[^ ][ ]*" \1esima

== ordinal(-masculine)? ==
([-−]?\d+) $(ordinal-masculine $(ordinal-feminine \2))
(.*)a \2o

== (ordinal)-number(-feminine|-masculine)? ==
([-−]?\d+) \3$(ordinal-number $(\1\2 \3))
.*a ª
.*o º

== help ==

"" $(1), $(2), |$(3)|\n$(help cardinal-feminine)$(help cardinal-masculine)$(help ordinal-feminine)$(help ordinal-masculine)$(help ordinal-number-feminine)$(help ordinal-number-masculine)
(.*) \1: $(\1 1), $(\1 2), |$(\1 3)|\n
`
modules['ja']=`
^0 零
1 一
2 二
3 三
4 四
5 五
6 六
7 七
8 八
9 九
1(\d) 十$1
(\d)(\d) $1十$2
1(\d\d) 百$1
(\d)(\d\d) $1百$2
1(\d\d\d) 千$1
(\d)(\d\d\d) $1千$2
(\d{1,4})(\d{4}) $1万$2
(\d{1,4})(\d{8}) $1億$2
(\d{1,4})(\d{12}) $1兆$2
(\d{1,4})(\d{16}) $1京$2
(\d{1,4})(\d{20}) $1垓$2
(\d{1,4})(\d{24}) $1秭$2
(\d{1,4})(\d{28}) $1穣$2
(\d{1,4})(\d{32}) $1溝$2
(\d{1,4})(\d{36}) $1澗$2
(\d{1,4})(\d{40}) $1正$2
(\d{1,4})(\d{44}) $1載$2

# negative numbers?

[-−](\d+) 负|$1

# decimals?

"([-−]?\d+)[.,]" "$1・"
"([-−]?\d+[.,]\d*)(\d)" $1||$2

# currency

# unit/subunit singular/plural

JPY 円

"([A-Z]{3}) ([-−]?\d+([.,]\d+)?)" $2$1

# formal numbers (大字) for legal and financial documents

== formal ==

^0 零
1 壱
2 弐
3 参
4 四
5 五
6 六
7 七
8 八
9 九
1(\d) 拾$(formal 1)
(\d)(\d) $(formal 1)拾$(formal 2)
1(\d\d) 百$(formal 1)
(\d)(\d\d) $(formal 1)百$(formal 2)
1(\d\d\d) 千$(formal 1)
(\d)(\d\d\d) $(formal 1)千$(formal 2)
(\d{1,4})(\d{4}) $(formal 1)万$(formal 2)
(\d{1,4})(\d{8}) $(formal 1)億$(formal 2)
(\d{1,4})(\d{12}) $(formal 1)兆$(formal 2)
(\d{1,4})(\d{16}) $(formal 1)京$(formal 2)
(\d{1,4})(\d{20}) $(formal 1)垓$(formal 2)
(\d{1,4})(\d{24}) $(formal 1)秭$(formal 2)
(\d{1,4})(\d{28}) $(formal 1)穣$(formal 2)
(\d{1,4})(\d{32}) $(formal 1)溝$(formal 2)
(\d{1,4})(\d{36}) $(formal 1)澗$(formal 2)
(\d{1,4})(\d{40}) $(formal 1)正$(formal 2)
(\d{1,4})(\d{44}) $(formal 1)載$(formal 2)

# negative numbers?

[-−](\d+) 负|$(formal 1)

# decimals

"([-−]?\d+)[.,]" "$(formal 1)・"
"([-−]?\d+[.,]\d*)(\d)" $(formal 1)||$(formal 2)

# currency

# unit/subunit singular/plural

JPY 円

"([A-Z]{3}) ([-−]?\d+([.,]\d+)?)" $(formal 2)$(formal 1)

== help ==

"" |$(1)|, |$(2)|, |$(3)|\n$(help formal)
(formal) \1: |$(\1 1)|, |$(\1 2)|, |$(\1 3)|\n
`
modules['ko']=`
^0 령	# [:ko-KP:]
^0 영
1 일
2 이 
3 삼
4 사
5 오
6 륙	# [:ko-KP:]
6 육
7 칠
8 팔
9 구
1(\d) 십$1
(\d)(\d) $1십$2
1(\d\d) 백$1
(\d)(\d\d) $1백$2
1(\d\d\d) 천$1
(\d)(\d\d\d) $1천$2
(\d{1,4})(\d{4}) $1만$2
(\d{1,4})(\d{8}) $1억$2
(\d{1,4})(\d{12}) $1조$2
(\d{1,4})(\d{16}) $1경$2
(\d{1,4})(\d{20}) $1해$2
(\d{1,4})(\d{24}) $1자$2
(\d{1,4})(\d{28}) $1양$2
(\d{1,4})(\d{32}) $1구$2
(\d{1,4})(\d{36}) $1간$2
(\d{1,4})(\d{40}) $1정$2
(\d{1,4})(\d{44}) $1재$2
(\d{1,4})(\d{52}) $1극$2

# negative numbers?

#[-−](\d+) 负|$1

# decimals?

#"([-−]?\d+)[.,]" "$1|点"
#"([-−]?\d+[.,]\d*)(\d)" $1||$2

# currency

# unit/subunit

u:([^,]*),([^,]*) \1
s:([^,]*),([^,]*) \2

CNY:(.) $(\1:런민비
JPY:(.) $(\1:엔,센)
KPW:(.) $(\1:조선민주주의인민공화국 원,전)
KRW:(.) $(\1:대한민국 원,전)
USD:(.) $(\1:미국 달러,센트)

"([A-Z]{3}) ([-−]?\d+([.,]0+)?)" $2$(\1:u)
"(([A-Z]{3}) [-−]?\d+)[.,](\d+)" $1$3$(\2:s)
`
modules['lb']=`
^0 null
1$ eent
1 een
2 zwee
3 dräi
4 véier
5 fënnef
6 sechs
7 siwen
8 aacht
9 néng
10 zéng
11 eelef
12 zwielef
15 fofzéng
16 siechzéng
17 siwwenzéng
18 uechzéng
19 nonzéng
1(\d) $1zéng
20 zwanzeg
2(\d) $1anzwanzeg
30 drësseg
3(\d) $1andrësseg
4(\d) $1avéierzeg
50 foffzeg
5(\d) $1afoffzeg
60 siechzeg
6(\d) $1asiechzeg
70 siwwenzeg
7(\d) $1asiwwenzeg
80 achtzeg
8(\d) $1anachtzeg
90 nonzeg
9(\d) $1annonzeg
(\d)0 $1zeg
(\d)(\d) $2an$1zeg
1(\d\d) honnert$1
(\d)(\d\d) $1honnert$2
1(\d{3}) dausend$1
(\d{1,3})(\d{3}) $1dausend$2
1(\d{6}) eng Millioun[ $1]
(\d{1,3})(\d{6}) $1 Milliounen[ $2]
1(\d{9}) eng Milliard[ $1]
(\d{1,3})(\d{9}) $1 Milliarden[ $2]
1(\d{12}) eng Billioun[ $1]
(\d{1,3})(\d{12}) $1 Billiounen[ $2]
1(\d{15}) eng Billiard[ $1]
(\d{1,3})(\d{15}) $1 Billiarden[ $2]
1(\d{18}) eng Trillioun[ $1]
(\d{1,3})(\d{18}) $1 Trilliounen[ $2]
1(\d{21}) eng Trilliard[ $1]
(\d{1,3})(\d{21}) $1 Trilliarden[ $2]

# negative number

[-−](\d+) minus |$1

# decimals

"([-−]?\d+)[.,]" $1| Komma
"([-−]?\d+[.,]\d*)(\d)" $1| |$2

# currency

# unit/subunit singular/plural

us:([^,]*),([^,]*),([^,]*),([^,]*) \1
up:([^,]*),([^,]*),([^,]*),([^,]*) \2
ss:([^,]*),([^,]*),([^,]*),([^,]*) \3
sp:([^,]*),([^,]*),([^,]*),([^,]*) \4

CHF:(\D+) $(\1: Schwäizer Frang, Schwäizer Frang, Rappen, Rappen)
CNY:(\D+) $(\1: Yuan, Yuan, Fen, Fen)
EUR:(\D+) $(\1: Euro, Euro, Cent, Cent)
GBP:(\D+) $(\1: Pond Sterling, Pond Sterling, Penny, Pence)
USD:(\D+) $(\1: US-Dollar, US-Dollar, Cent, Cents)

"JPY ([-−]?\d+([.,]\d+)?)" $1 Yen

"([A-Z]{3}) ([-−]?1)([.,]00?)?" $2$(\1:us)
"([A-Z]{3}) ([-−]?\d+)([.,]00?)?" $2$(\1:up)

"(CNY [-−]?\d+)[.,]10?" $1 $2 Jiao
"(CNY [-−]?\d+)[.,](\d)0?" $1 $2 Jiao
"(CNY [-−]?\d+[.,]\d)1" $1 $2 Fen
"(CNY [-−]?\d+[.,]\d)(\d)" $1 $2 Fen

"(([A-Z]{3}) [-−]?\d+)[.,](01)" $1 an $(1)$(\2:ss)
"(([A-Z]{3}) [-−]?\d+)[.,](\d)" $1 an $(\30)$(\2:sp)
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1 an $3$(\2:sp)

== ordinal ==

([-−]?[0245679])	$1t
([-−]?\d*0[245679])	$1t
([-−]?\d*1\d)		$1t
([-−]?\d+)		$(ordinal $1)

(.*)eent	\1éischt
(.*)dräi	\1drëtt
(.*)aacht	\1aacht
"(.*)eine Milli(on|ard)e?"	\1einmilli\2st
"(.*)eine Billi(on|ard)e?"	\1einbilli\2st
"(.*)eine Trilli(on|ard)e?"	\1eintrilli\2st
"(.*) Milli(on|ard)en"	\1milli\2st
"(.*) Billi(on|ard)en"	\1billi\2st
"(.*) Trilli(on|ard)en"	\1trilli\2st
(.*)		\1st

== ordinal-number ==

(\d+)	\1.

== help ==

"" |$(1)|, $(2), $(3)\n$(help ordinal)$(help ordinal-number)
(ordinal(-number)?) \1: |$(\1 1)|, $(\1 2), $(\1 3)\n
`
modules['lt']=`
^0 nulis
1 vienas
2 du
3 trys
4 keturi
5 penki
6 šeši
7 septyni
8 aštuoni
9 devyni
10 dešimt
11 vienuolika
12 dvylika
13 trylika
14 keturiolika
15 penkiolika
16 šešiolika
17 septyniolika
18 aštuoniolika
19 devyniolika

2(\d) dvidešimt[ $1]
3(\d) trisdešimt[ $1]
([4-9])(\d) $1|asdešimt[ $2]

1(\d\d) šimtas[ $1]
(\d)(\d\d) $1 šimtai[ $2]

1(\d{3}) tūkstantis[ $1]
(\d?1\d|\d?\d?0)(\d{3}) $1 tūkstančių[ $2]
(\d?\d1)(\d{3}) $1 tūkstantis[ $2]
(\d{1,3})(\d{3}) $1 tūkstančiai[ $2]

(\d?1\d|\d?\d?0)(\d{6}) $1 milijonų[ $2]
(\d?\d?1)(\d{6}) $1 milijonas[ $2]
(\d{1,3})(\d{6}) $1 milijonai[ $2]

(\d?1\d|\d?\d?0)(\d{9}) $1 milijardų[ $2]
(\d?\d?1)(\d{9}) $1 milijardas[ $2]
(\d{1,3})(\d{9}) $1 milijardai[ $2]

(\d?1\d|\d?\d?0)(\d{12}) $1 trilijonų[ $2]
(\d?\d?1)(\d{12}) $1 trilijonas[ $2]
(\d{1,3})(\d{12}) $1 trilijonai[ $2]

(\d?1\d|\d?\d?0)(\d{15}) $1 kvadrilijonų[ $2]
(\d?\d?1)(\d{15}) $1 kvadrilijonas[ $2]
(\d{1,3})(\d{15}) $1 kvadrilijonai[ $2]

(\d?1\d|\d?\d?0)(\d{18}) $1 kvintilijonų[ $2]
(\d?\d?1)(\d{18}) $1 kvintilijonas[ $2]
(\d{1,3})(\d{18}) $1 kvintilijonai[ $2]

# negative numbers

[-−](\d+) minus |$1

# decimals

# decimals
([-−]?\d+)[.,] $1| taškas
([-−]?\d+[.,]\d*)(\d) $1| |$2

# currency

# unit/subunit

us:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \1
up:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \2
ug:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \3
ss:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \4
sp:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \5
sg:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \6

LTL:(\D+) $(\1: litas, litų, litai, centas, centų, centai)
EUR:(\D+) $(\1: euras, eurų, eurai, centas, centų, centai)

"([A-Z]{3}) ([-−]?\d*(1\d|0))([.,]00?)?" $2|$(\1:up)
"([A-Z]{3}) ([-−]?\d*1)([.,]00?)?" $2|$(\1:us)
"([A-Z]{3}) ([-−]?\d+)([.,]00?)?" $2|$(\1:ug)

"(([A-Z]{3}) [-−]?\d+)[.,](01)" $1 |$(1)$(\2:ss)
"((LTL|EUR) [-−]?\d+)[.,](1\d|\d0)" $1 $3|$(\2:sp)
"((LTL|EUR) [-−]?\d+)[.,](\d)" $1 $(\30)|$(\2:sp)
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1 |$3$(\2:sg)

== feminine ==

([-−]?\d+)	$(feminine $1)
(.*)vienas	\1viena
(.*)du		\1dvi
(.*)i		\1ios

== masculine ==

([-−]?\d+)	$1

== ordinal ==

([-−]?\d+)	$(ordinal $1)

(.*)vienas	\1pirmas
(.*)du		\1antras
(.*)trys	\1trečias
(.*)keturi	\1ketvirtas
(.*)penki	\1penktas
(.*)šeši	\1šeštas
(.*)septyni	\1septintas
(.*)aštuoni	\1aštuntas
(.*)devyni	\1devintas
(.*)dešimt	\1dešimtas
(.*)lika	\1liktas
(.*)šimtas	\1šimtasis
(.*)		\1	# FIXME (tūkstančių etc.)

== ordinal-masculine ==

([-−]?\d+)	$(ordinal $1)

== ordinal-feminine ==

([-−]?\d+)	$(ordinal-feminine $(ordinal $1))

(.*)tasis	\1toji
(.*)s		\1
(.*)		\1	# FIXME (tūkstančių etc.)

== ordinal-number ==

(\d+)	\1.

== help ==

"" $(help feminine)$(help masculine)$(help ordinal-feminine)$(help ordinal-masculine)$(help ordinal-number)
(feminine|masculine|ordinal(-feminine|-masculine|-number)?) \1: $(\1 1), $(\1 2), $(\1 3)\n
`
modules['lv']=`
^0 nulle
1 viens
2 divi
3 trīs
4 četri
5 pieci
6 seši
7 septiņi
8 astoņi
9 deviņi
10 desmit
11 vienpadsmit
12 divpadsmit
13 trīspadsmit
14 četrpadsmit
15 piecpadsmit
16 sešpadsmit
17 septiņpadsmit
18 astoņpadsmit
19 deniņpadsmit
([2])(\d) divdesmit[ $2]
([23456789])(\d) $1|desmit[ $2]
1(\d\d) simts[ $1]
(\d)(\d\d) $1 simti[ $2]
1(\d{3}) viens tūkstotis[ $1]
(\d{1,3})(\d{3}) $1 tūkstoši[ $2]
1(\d{6}) viens miljons[ $1]
(\d{1,3})(\d{6}) $1 miljoni[ $2]
1(\d{9}) viens miljards[ $1]
(\d{1,3})(\d{9}) $1 miljardi[ $2]
1(\d{12}) viens triljons[ $1]
(\d{1,3})(\d{12}) $1 triljoni[ $2]
1(\d{15}) viens kvadriljons[ $1]
(\d{1,3})(\d{15}) $1 kvadriljoni[ $2]
1(\d{18}) viens kvintiljons[ $1]
(\d{1,3})(\d{18}) $1 kvintiljoni[ $2]
1(\d{21}) viens sekstiljons[ $1]
(\d{1,3})(\d{21}) $1 sekstiljoni[ $2]
1(\d{24}) viens septiljons[ $1]
(\d{1,3})(\d{24}) $1 septiljoni[ $2]

# negative numbers

[-−](\d+) mīnus |$1

# decimals


([-−]?\d+)[.,] $1| komats
([-−]?\d+[.,]\d*)(\d) $1| |$2


# currency

# unit/subunit

us:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \1
up:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \2
ug:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \3
ss:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \4
sp:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \5
sg:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \6

LVL:(\D+) $(\1: lats, lati,latu, santīms, santīmi, santīmu)
EUR:(\D+) $(\1: eiro, eiro, eiro, cents, centi, centu)
RUB:(\D+) $(\1: rublis, rubļi, rubļu, kapeika, kapeikas, kapeiku)
USD:(\D+) $(\1: ASV dolārs, ASV dolāri, ASV dolāru, cents, centi, centu)


"([A-Z]{3}) ([-−]?1)([.,]00?)?" $2|$(\1:us)
"([A-Z]{3}) ([-−]?\d*[02-9]1)([.,]00?)?" $2|$(\1:us)
"([A-Z]{3}) ([-−]?[23456789])([.,]00?)?" $2|$(\1:up)
"([A-Z]{3}) ([-−]?\d*[02-9][23456789])([.,]00?)?" $2|$(\1:up)
"([A-Z]{3}) ([-−]?\d+)([.,]00?)?" $2|$(\1:ug)

"((RUB) [-−]?\d+)[.,]([02-9])1" $1 $(\30) |$(feminine 1)$(\2:ss)
"((RUB) [-−]?\d+)[.,]([02-9][23456789])" $1 $(feminine \3)$(\2:sp)

"(([A-Z]{3}) [-−]?\d+)[.,](01)" $1 |$(1)$(\2:ss)
"(([A-Z]{3}) [-−]?\d+)[.,]([02-9])1" $1 $(\30) |$(1)$(\2:ss)

"(([A-Z]{3}) [-−]?\d+)[.,]([02-9][23456789])" $1 |$3$(\2:sp)

"(([A-Z]{3}) [-−]?\d+)[.,](\d)" $1 |$(\30)$(\2:sg)
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1 |$3$(\2:sg)

== feminine ==

([-−]?\d+)	$(feminine $1)

(.*)viens	viena
(.*)i		\1as
(.*)		\1

== masculine ==

([-−]?\d+)	$1

== ordinal ==

([-−]?\d+)	$(ordinal $1)

(.*)viens	\1pirmais
(.*)divi	\1otrais
(.*)trīs	\1trešais
(.*)četri	\1ceturtais
(.*)pieci	\1piektais
(.*)seši	\1sestais
(.*)septiņi	\1septītais
(.*)astoņi	\1astotais
(.*)deviņi	\1devītais
(.*)mit		\1mitais

== ordinal-number ==

(\d+)	\1.

== help ==

"" $(help feminine)$(help masculine)$(help ordinal)$(help ordinal-number)
(feminine|masculine|ordinal(-number)?) \1: $(\1 1), $(\1 2), $(\1 3)\n
`
modules['ms']=`
^0 kosong
1 satu
2 dua
3 tiga
4 empat
5 lima
6 enam
7 tujuh
8 lapan
9 sembilan
10 sepuluh
11 sebelas
1(\d) $1 belas
(\d)(\d) $1 puluh[ $2]
1(\d\d) seratus[ $1]
(\d)(\d\d) $1 ratus[ $2]
1(\d{3}) seribu[ $1]
(\d{1,3})(\d{3}) $1 ribu[ $2]
# sejuta or setu juta etc.
(\d{1,3})(\d{6}) $1 juta[ $2]
(\d{1,3})(\d{9}) $1 bilion[ $2]
(\d{1,3})(\d{12}) $1 trilion[ $2]
(\d{1,3})(\d{15}) $1 kuadrilion[ $2]
(\d{1,3})(\d{18}) $1 kuantilion[ $2]
(\d{1,3})(\d{21}) $1 sextilion[ $2]
(\d{1,3})(\d{24}) $1 septilion[ $2]

# negative numbers

[-−](\d+) minus |$1

# decimals

"([-−]?\d+)[.,]" $1| koma
"([-−]?\d+[.,]\d*)(\d)" $1| |$2

# currency

# unit/subunit

u:(.*),(.*)	\1
s:(.*),(.*)	\2

AUD:(.)	$(\1: dollar Australia, sen)
BGN:(.)	$(\1: lev, leva, stotinka, stotinki)
BWP:(.)	$(\1: pula, pula, thebe, thebe)
CAD:(.)	$(\1: dollar Kanada, sen)
CHF:(.)	$(\1: franc Swiss, sen)
CNY:(.)	$(\1: yuan, fen)
CZK:(.)	$(\1: koruna Czech, koruna Czech, halér, halére)
EEK:(.)	$(\1: kroon, kroonid, sen)
EUR:(.)	$(\1: euro, sen)
GBP:(.)	$(\1: pound sterling, penny)
GHS:(.)	$(\1: cedi Ghana, pesewas)
GMD:(.)	$(\1: dalasi, bututs)
HKD:(.)	$(\1: dollar Hongkong, sen)
IDR:(.)	$(\1: rupiah, sen)
INR:(.)	$(\1: rupee India, paisa)
JMD:(.)	$(\1: dollar Jamaika, sen)
JPY:(.)	$(\1: yen, sen)
KRW:(.)	$(\1: won, chon)
KES:(.)	$(\1: shilling Kenya, sen)
LRD:(.)	$(\1: dollar Liberia, sen)
LSL:(.)	$(\1: loti, sente)
LTL:(.)	$(\1: litas, sen)
LVL:(.)	$(\1: lats, sen)
MGA:(.)	$(\1: ariary, iraimbilanja)
MUR:(.)	$(\1: rupee Mauritius, sen)
MXN:(.)	$(\1: peso Meksiko, centavo)
MWK:(.)	$(\1: kwacha Malawi, tambala)
NAD:(.)	$(\1: dollar Namibia, sen)
NGN:(.)	$(\1: naira, kobo)
NZD:(.)	$(\1: dollar New Zealand, sen)
PGK:(.)	$(\1: kina, toea)
PHP:(.)	$(\1: peso Filipina, centavo)
PKR:(.)	$(\1: rupee Pakistan, paisa)
PLN:(.)	$(\1: zloty, grosz)
RON:(.)	$(\1: leu Romania, ban)
RSD:(.)	$(\1: dinar Serbia, para)
RUB:(.)	$(\1: ruble Russia, kopek)
RWF:(.)	$(\1: franc Rwanda, centime)
SGD:(.)	$(\1: dollar Singapura, sen)
SLL:(.)	$(\1: leone, sen)
SZL:(.)	$(\1: lilangeni, sen)
THB:(.)	$(\1: baht, satang)
TRY:(.)	$(\1: lira Turki, kurus)
TTD:(.)	$(\1: dollar Trinidad dan Tobago, sen)
TZS:(.)	$(\1: shilling Tanzania,sen)
UAH:(.)	$(\1: hryvnia, kopiyka)
UGX:(.)	$(\1: shilling Uganda, sen)
USD:(.)	$(\1: dolar Amerika, sen)
ZAR:(.)	$(\1: rand Afrika Selatan, sen)
ZMK:(.)	$(\1: kwacha Zambia, ngwee)
ZWL:(.)	$(\1: dollar Zimbabwe, sen)

"(JPY [-−]?\d+)[.,](\d\d)0" $1
"(JPY [-−]?\d+[.,]\d\d)(\d)" $1 $2 rin

"([A-Z]{3}) ([-−]?\d+)([.,]00?)?" $2$(\1:u)

"(CNY [-−]?\d+)[.,](\d)0?" $1 $2 yiao
"(CNY [-−]?\d+[.,]\d)(\d)" $1 $2 fen

"(([A-Z]{3}) [-−]?\d+)[.,](\d)" $1 dan $(\30)$(\2:s)
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1 dan $3$(\2:s)

== ordinal ==

1		pertama
(\d+)		$(ordinal ke$1)
"kesatu (.*)"	kese\1
(.*)		\1

== ordinal-number ==

1	1
(\d+)	ke-\1

== help ==

"" $(1), $(2), $(3)\n$(help ordinal)$(help ordinal-number)
(ordinal(-number)?) \1: $(\1 1), $(\1 2), $(\1 3)\n
`
modules['nl']=`
^0$ nul
1$ een
1 eenen
2$ twee
2 tweeën
3$ drie
3 drieën
4$ vier
4 vieren
5$ vijf
5 vijfen
6$ zes
6 zesen
7$ zeven
7 zevenen
8$ acht
8 achten
9$ negen
9 negenen

10 tien
11 elf
12 twaalf
13 dertien
14 veertien
1(\d) $1|tien

2(\d) $1twintig
3(\d) $1dertig
4(\d) $1veertig
8(\d) $1tachtig
(\d)(\d) $2$1|tig

1(\d\d) honderd$1
(\d)(\d\d) $1|honderd$2
10(\d{2}) duizend[ $1]
(\d)0(\d{2}) $1|duizend[ $2]
(1\d)(\d{2}) $1|honderd$2
(\d\d)(\d{2}) $1|honderd$2
(\d{2,3})(\d{3}) $1|duizend[ $2]

(\d{1,3})(\d{6}) $1| miljoen[ $2]
(\d{1,3})(\d{9}) $1| miljard[ $2]
(\d{1,3})(\d{12}) $1| biljoen[ $2]
(\d{1,3})(\d{15}) $1| biljard[ $2]
(\d{1,3})(\d{18}) $1| triljoen[ $2]
(\d{1,3})(\d{21}) $1| triljard[ $2]

# negative number

[-−](\d+) min |$1

# decimals

([-−]?\d+)[.,] $1| komma
([-−]?\d+[.,]\d*)(\d) $1| |$2

# currencies
	
# unit/subunit

u:([^,]*),([^,]*),([^,]*)	\1
s:([^,]*),([^,]*),([^,]*)	\2
p:([^,]*),([^,]*),([^,]*)	\3

CHF:(.)	$(\1: Zwitserse franc, centime, centimes)
CNY:(.)	$(\1: renminbi yuan, fen, fen)
EUR:(.)	$(\1: euro, cent, cent)
GBP:(.)	$(\1: pond sterling, penny, pence)
JPY:(.)	$(\1: yen, sen, sen)
USD:(.)	$(\1: Amerikaanse dollar, cent, cent)

"(JPY [-−]?\d+)[.,](\d\d)0" $1
"(JPY [-−]?\d+[.,]\d\d)(\d)" $1 $2| rin

"([A-Z]{3}) ([-−]?\d+)([.,]00?)?" $2|$(\1:u)

"(CNY [-−]?\d+)[.,](\d)0?" $1 $2| jiao
"(CNY [-−]?\d+[.,]\d)(\d)" $1 $2| fen

"(([A-Z]{3}) [-−]?\d+)[.,](01)" $1 een$(\2:s)
"(([A-Z]{3}) [-−]?\d+)[.,](\d)" $1 $(\30)|$(\2:p)
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1 $3|$(\2:p)

== ordinal ==

([-−]?([24-79]|\d*1\d|\d+0[24-79]))	$1|de
([-−]?\d+)	$(ordinal |$1)

(.*)een		\1eerste
(.*)drie	\1derde
(.*)		\1ste

== ordinal-number ==

([-−]?([2-79]|\d*1\d|\d+0[2-79]))	\1de
([-−]?\d+)	\1ste

== help ==

"" $(1)|, $(2)|, $(3)|\n$(\0 ordinal)$(\0 ordinal-number)currency \(for example, EUR\): $(EUR 2.5)
"(ordinal(-number)?)" \1: $(\1 1), $(\1 2), $(\1 3)\n

`
modules['pl']=`
^0 zero
1 jeden
2 dwa
3 trzy
4 cztery
5 pięć
6 sześć
7 siedem
8 osiem
9 dziewięć
10 dziesięć
11 jedenaście
14 czternaście
15 piętnaście
16 szesnaście
19 dziewiętnaście
1(\d) $1naście
2(\d) dwadzieścia[ $1]
3(\d) trzydzieści[ $1]
4(\d) czterdzieści[ $1]
(\d)(\d) $1dziesiąt[ $2]
1(\d\d) sto[ $1]
2(\d\d) dwieście[ $1]
([34])(\d\d) $1sta[ $2]
(\d)(\d\d) $1set[ $2]
1(\d{3}) tysiąc[ $1]
([234]|[2-9][234]|\d[02-9][234])(\d{3}) $1 tysiące[ $2]
(\d{1,3})(\d{3}) $1 tysięcy[ $2]

# affix function
:1,(.+) \1
:(1[1-9]),(.+) $1 \2ów
:([234]|[2-9][234]|\d[02-9][234]),(.+) $1 \2y
:(\d+),(.+) $1 \2ów

(\d{1,3})(\d{6}) $(:\1,milion)[ $2]
(\d{1,3})(\d{9}) $(:\1,miliard)[ $2]
(\d{1,3})(\d{12}) $(:\1,bilion)[ $2]
(\d{1,3})(\d{15}) $(:\1,biliard)[ $2]
(\d{1,3})(\d{18}) $(:\1,trylion)[ $2]
(\d{1,3})(\d{21}) $(:\1,tryliard)[ $2]
(\d{1,3})(\d{24}) $(:\1,kwadrylion)[ $2]

# negative number

[-−](\d+) minus |$1

# decimals

"([-−]?\d+)[.,]" $1| przecinek
"([-−]?\d+[.,])([^0]\d)" $1| |$2
"([-−]?\d+[.,])(\d)(\d)(\d)" $1| |$2 |$3 |$4
"([-−]?\d+[.,]\d*)(\d)" $1| |$2

# currency

# unit/subunit singular / nominative plural / genitive plural

us:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \1
up:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \2
ug:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \3
ss:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \4
sp:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \5
sg:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \6

AUD:(\D+) $(\1: dolar australijski, dolary australijskie, dolarów australijskich, cent, centy, centów)
BGN:(\D+) $(\1: lew bułgarski, lewy bułgarskie, lewów bułgarskich, stotinka, stotinki, stotinek)
CHF:(\D+) $(\1: frank szwajcarski, franki szwajcarskie, franków szwajcarskich, centym, centymy, centymów)
CAD:(\D+) $(\1: dolar kanadyjski, dolary kanadyjskie, dolarów kanadyjskich, cent, centy, centów)
CNY:(\D+) $(\1: juan, juany, juanów, fen, feny, fenów)
EUR:(\D+) $(\1: euro, euro, euro, cent, centy, centów)
GBP:(\D+) $(\1: funt szterling, funty szterlingi, funtów szterlingów, pens, pensy, pensów)
HUF:(\D+) $(\1: forint, forinty, forintów, filler, fillery, fillerów)
JPY:(\D+) $(\1: jen, jeny, jenów, sen, seny, senów)
PLN:(\D+) $(\1: złoty, złote, złotych, grosz, grosze, groszy)
RUB:(\D+) $(\1: rubel rosyjski, ruble rosyjskie, rubli rosyjskich, kopiejka, kopiejki, kopiejek)
USD:(\D+) $(\1: dolar amerykański, dolary amerykańskie, dolarów amerykańskich, cent, centy, centów)

"([A-Z]{3}) ([-−]?1)([.,]00?)?" $2$(\1:us)
"([A-Z]{3}) ([-−]?[234])([.,]00?)?" $2$(\1:up)
"([A-Z]{3}) ([-−]?\d*[02-9][234])([.,]00?)?" $2$(\1:up)
"([A-Z]{3}) ([-−]?\d+)([.,]00?)?" $2$(\1:ug)

"(CNY [-−]?\d+)[.,]10?" $1 $2 jiao
"(CNY [-−]?\d+)[.,](\d)0?" $1 $2 jiao
"(CNY [-−]?\d+[.,]\d)1" $1 $2 fen
"(CNY [-−]?\d+[.,]\d)(\d)" $1 $2 fenów

"(([A-Z]{3}) [-−]?\d+)[.,](01)" $1 |$(1)$(\2:ss)
"(([A-Z]{3}) [-−]?\d+)[.,]([02-9][234])" $1 |$3$(\2:sp)
"(([A-Z]{3}) [-−]?\d+)[.,](\d)" $1 |$(\30)$(\2:sg)
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1 |$3$(\2:sg)

== ordinal(-masculine)? ==

([-−]?\d+)	$(ordinal |$2)

(.*)jeden	\2pierwszy
(.*)dwa		\2drugi
(.*)trzy	\2trzeci
(.*)cztery	\2czwarty
(.*)pięć	\2piąty
(.*)sześć	\2szósty
(.*)siedem	\2siódmy
(.*)osiem	\2ósmy
(.*)dziewięć	\2dziewiąty
(.*)dziesięć	\2dziesiąty
(.*)jedenaście	\2jedenasty
(.*)dwanaście	\2dwunasty
(.*)dwieście	\2dwusetny
(.*)siąt	\2siąty
(.*)trzysta	\2trzechsetny
(.*)czterysta	\2czterechsetny
(.*)ści[ea]	\2sty
(.*)eści	\2esty
(.*)(sto|set)	\2setny
"(.*)dwa tysiące"	\2dwutysięczny
"(.*)pięć tysięcy"	\2pięciotysięczny
"(.*)sto tysięcy"	\2stutysięczny
"(.*) (tysi[ąę]c[ey]?)"	\2tysięczny
(.*)tysiąc	\2tysięczny
(.*(on|ard))(y|ów)?	\2owy

== ordinal-feminine ==

([-−]?\d+)	$(ordinal-feminine $(ordinal |$1))
(.*)[yi]	\1a

== ordinal-neuter ==

([-−]?\d+)	$(ordinal-feminine $(ordinal |$1))
(.*)[yi]	\1e

== ordinal-number ==

(\d+)	\1.

== help ==

"" $(1), $(2), $(3)\n$(help ordinal)$(help ordinal-number)
(ordinal(-number)?) \1: $(\1 1), $(\1 2), $(\1 3)\n
`
modules['pt']=`
^0 zero
1 um
2 dois
3 três
4 quatro
5 cinco
6 seis
7 sete
8 oito
9 nove
10 dez
11 onze
12 doze
13 treze
14 quatorze
15 quinze
16 dezesseis	# [:pt-BR:]
16 dezasseis
17 dezessete	# [:pt-BR:]
17 dezassete
18 dezoito
19 dezenove	# [:pt-BR:]
19 dezanove
20 vinte
30 trinta
40 quarenta
50 cinquenta
60 sessenta
70 setenta
80 oitenta
90 noventa
(\d)(\d) $(\10) e $2
100 cem
1(\d\d) cento e $1
2(\d\d) duzentos[ e $1]
3(\d\d) trezentos[ e $1]
5(\d\d) quinhentos[ e $1]
(\d)(\d\d) $1centos[ e $2]

:0+
:0*\d{1,2}(\d{6}){0,} " e "	# mil e um, mil e dez
:0*\d00(\d{6}){0,} " e "	# mil e quinhentos
:0*\d{1,2}000(\d{6}){0,} " e "	# um milhão e onze mil
:0*\d{1}00000(\d{6}){0,} " e "	# um milhão e cem mil
:\d+ " "

pl:1	ão			# milhão
pl:.*	ões			# milhões

1(\d\d\d) mil$(:\1)$1
(\d{1,3})(\d\d\d) $1 mil$(:\2)$2

(\d{1,3})(\d{6}) $1 milh$(pl:\1)$(:\2)$2	# [:pt-BR:]
(\d{1,3})(\d{9}) $1 bilh$(pl:\1)$(:\2)$2	# [:pt-BR:]
(\d{1,3})(\d{12}) $1 trilh$(pl:\1)$(:\2)$2	# [:pt-BR:]
(\d{1,3})(\d{15}) $1 quatrilh$(pl:\1)$(:\2)$2	# [:pt-BR:]
(\d{1,3})(\d{18}) $1 quintilh$(pl:\1)$(:\2)$2	# [:pt-BR:]
(\d{1,3})(\d{18}) $1 sextilh$(pl:\1)$(:\2)$2	# [:pt-BR:]
(\d{1,3})(\d{24}) $1 septilh$(pl:\1)$(:\2)$2	# [:pt-BR:]

(\d{1,6})(\d{6}) $1 milh$(pl:\1)$(:\2)$2
(\d{1,6})(\d{12}) $1 bili$(pl:\1)$(:\2)$2
(\d{1,6})(\d{18}) $1 trili$(pl:\1)$(:\2)$2
(\d{1,6})(\d{24}) $1 quatrili$(pl:\1)$(:\2)$2

# negative number

[-−](\d\d*) menos |$1

# decimals

([-−]?\d+)[.] $1| ponto
([-−]?\d+)[,] $1| vírgula
([-−]?\d+[.,])([^0]\d) $1| |$2
"([-−]?\d+[.,])(\d)(\d)(\d)" |$1 |$2| |$3| |$4
([-−]?\d+[.,]\d*)(\d) $1| |$2

# currency (monedas)

# unit/subunit singular/plural

us:([^,]*),([^,]*),([^,]*),([^,]*) \1
up:([^,]*),([^,]*),([^,]*),([^,]*) \2
ss:([^,]*),([^,]*),([^,]*),([^,]*) \3
sp:([^,]*),([^,]*),([^,]*),([^,]*) \4

AOA:(\D+) $(\1: kwanza, kwanzas, cêntimo, cêntimos)
ARG:(\D+) $(\1: peso argentino, pesos argentinos, centavo, centavos)
BOB:(\D+) $(\1: boliviano, bolivianos, centavo, centavos)
BRL:(\D+) $(\1: real, reais, centavo, centavos)				# [:pt-BR:]
BRL:(\D+) $(\1: real, réis, centavo, centavos)
CHF:(\D+) $(\1: franco suíço, francos suíços, cêntimo, cêntimos)
CNY:(\D+) $(\1: yuan renminbi, yuan renminbi, fen, fen)
CVE:(\D+) $(\1: escudos cabo-verdianos, escudos cabo-verdianos, centavo, centavos)
EUR:(\D+) $(\1: euro, euros, cent, cents)
GBP:(\D+) $(\1: libra esterlina, libras esterlinas, penny, pence)
JPY:(\D+) $(\1: iene, ienes, sen, sen)
MOP:(\D+) $(\1: pataca, patacas, avo, avos)
MXN:(\D+) $(\1: peso mexicano, pesos mexicanos, centavo, centavos)
MZM:(\D+) $(\1: metical, meticais, centavo, centavos)
STD:(\D+) $(\1: dobra, dobras, cêntimo, cêntimos)
USD:(\D+) $(\1: dólar americano, dólares americanos, cêntimo, cêntimos)
XOF:(\D+) $(\1: franco CFA, francos CFA, cêntimo, cêntimos)

# masculine to feminine conversion of "un" after millions,
# if "as?$" matches currency name

f:(.*il[hi])(.*),(.*) \1$(f:\2,\3)	# don't modify millions
f:(.*um)([^a].*,|,)(.*as?) $(f:\1a\2\3)	# um libra -> uma libra
f:(.*d)oi(s.*),(.*as?) $(f:\1ua\2,\3)	# dois libra -> duas libra
f:(.*ent)o(s.*),(.*as?) $(f:\1a\2,\3)	# duzentos libra -> duzentas libra
f:(.*),(.*) \1\2

"([A-Z]{3}) ([-−]?1)([.,]00?)?"$(f:|$2,$(\1:us))
"([A-Z]{3}) ([-−]?\d+0{6,})([.,]00?)?" $2 de$(\1:up)
"([A-Z]{3}) ([-−]?\d+)([.,]00?)?"$(f:|$2,$(\1:up))

"(CNY [-−]?\d+)[.,]10?" $1 $2 jiao
"(CNY [-−]?\d+)[.,](\d)0?" $1 $2 jiao
"(CNY [-−]?\d+[.,]\d)1" $1 $2 fen
"(CNY [-−]?\d+[.,]\d)(\d)" $1 $2 fen

"(([A-Z]{3}) [-−]?\d+)[.,](01)" $1 e |$(1)$(\2:ss)
"(([A-Z]{3}) [-−]?\d+)[.,](\d)" $1 e |$(\30)$(\2:sp)
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1 e |$3$(\2:sp)

== feminine ==

([-−]?\d+) $(feminine $1)

(.*)um \1uma
(.*)dois(.*)	$(feminine \1duas\2)
(.*) \1

== masculine ==

([-−]?\d+) $1

== ordinal(-masculine)? ==

1 primeiro
2 segundo
3 terceiro
4 quarto
5 quinto
6 sexto
7 sétimo
8 oitavo
9 nono
10 décimo
20 vigésimo
30 trigésimo
40 cuadragésimo
50 quincuagésimo
60 sexagésimo
70 septuagésimo
80 octogésimo
90 nonagésimo
(\d)(\d) $(ordinal \20) $(ordinal \3)
100 centésimo
200 ducentésimo
300 trecentésimo
400 quadrigentésimo
500 quingentésimo
600 sexcentésimo
700 septicentésimo
800 octigentésimo
900 nongentésimo
(\d)(\d\d) $(ordinal \200) $(ordinal \3)
1(\d{3}) milésimo[ $(ordinal \2)]
(\d)(\d{3}) $2 milésimo[ $(ordinal \3)]
1(\d{6}) milionésimo[ $(ordinal \2)]
(\d{1,3})(\d{6}) $2 milionésimo[ $(ordinal \3)]
1(\d{9}) bilionésimo[ $(ordinal \2)]
(\d{1,3})(\d{9}) $2 bilionésimo[ $(ordinal \3)]

== ordinal-feminine ==

([-−]?\d+) $(ordinal-feminine $(ordinal-masculine \1))
(.*)o\b(.*)  $(ordinal-feminine \1a\2)
(.*)   \1

== (ordinal)-number-(feminine|masculine)? ==

([-−]?\d+) \3$(ordinal-number-feminine $(\1-\2 \3))
.*er .ᵉʳ
.*a .ª
.*o .º

== help ==

"" $(1)|, $(2), $(3)\n$(\0 feminine)$(\0 masculine)$(\0 ordinal-feminine)$(\0 ordinal-masculine)$(\0 ordinal-number-feminine)$(\0 ordinal-number-masculine)
(feminine|masculine|ordinal(-number)?(-feminine|-masculine)?) \1: $(\1 1), $(\1 2), $(\1 3)\n
`
modules['ro']=`
^0 zero
1 unu
2$ doi
2 două
3 trei
4 patru
5 cinci
6$ șase
6 șai
7 șapte
8 opt
9 nouă
10 zece
11 unsprezece
12 doisprezece
14 paisprezece
1(\d) $1sprezece
(\d)(\d) $1zeci[ și $2]
1(\d\d) o sută[ $1]
(\d)(\d\d) $1 sute[ $2]
1(\d{3}) o mie[ $1]
(1?\d)(\d{3}) $1 mii[ $2]
(\d{1,3})(\d{3}) $1 de mii[ $2]

1(\d{6}) un milion[ $1]
(1?\d)(\d{6}) $1 milioane[ $2]
(\d{1,3})(\d{6}) $1 de milioane[ $2]
1(\d{9}) un miliard[ $1]
(1?\d)(\d{9}) $1 miliarde[ $2]
(\d{1,3})(\d{9}) $1 de miliarde[ $2]
1(\d{12}) un trilion[ $1]
(1?\d)(\d{12}) $1 trilioane[ $2]
(\d{1,3})(\d{12}) $1 de trilioane[ $2]
1(\d{15}) un cvadrilion[ $1]
(1?\d)(\d{15}) $1 cvadrilioane[ $2]
(\d{1,3})(\d{15}) $1 de cvadrilioane[ $2]
1(\d{18}) un cvintilion[ $1]
(1?\d)(\d{18}) $1 cvintilioane[ $2]
(\d{1,3})(\d{18}) $1 de cvintilioane[ $2]
1(\d{21}) un sextilion[ $1]
(1?\d)(\d{21}) $1 sextilioane[ $2]
(\d{1,3})(\d{21}) $1 de sextilioane[ $2]
1(\d{24}) un septilion[ $1]
(1?\d)(\d{24}) $1 septilioane[ $2]
(\d{1,3})(\d{24}) $1 de septilioane[ $2]

# negative number

[-−](\d+) minus |$1

# decimals

"([-−]?\d+)[.,]" $1| virgulă
"([-−]?\d+[.,])([^0]\d)" $1| |$2
"([-−]?\d+[.,])(\d)(\d)(\d)" $1| |$2 |$3 |$4
"([-−]?\d+[.,]\d*)(\d)" $1| |$2

# currency

# feminine/masculine correction for 1 and 2

f:(.*)unu \1 o
f:(.*do)i "\1uă "
m:(.*un)u \1
.:(.*) \1

# unit/subunit, singular/plural, feminine/masculine unit, feminine/masculine subunit

us(.).:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) $(\1:\6) \2
up(.).:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) $(\1:\6) \3
ss.(.):([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) $(\1:\6) \4
sp.(.):([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) $(\1:\6) \5

# "mm" means masculine unit and masculine subunit

CHF:(.+),(.+) $(\1mm: franc elvețian, franci elvețieni, cent, cenți, \2)
CNY:(.+),(.+) $(\1mm: yuan renminbi, yuani renminbi, fen, fen, \2)
EUR:(.+),(.+) $(\1mm: euro, euro, cent, cenți, \2)
GBP:(.+),(.+) $(\1fm: liră sterlină, lire sterline, penny, pence, \2)
JPY:(.+),(.+) $(\1mm: yen, yeni, sen, sen, \2)
RON:(.+),(.+) $(\1mm: leu românesc, lei românești, ban, bani, \2)
USD:(.+),(.+) $(\1mm: dolar american, dolari americani, cent, cenți, \2)

"([A-Z]{3}) ([-−]?1)([.,]00?)?"$(\1:us,|$2)
"([A-Z]{3}) ([-−]?\d+)([.,]00?)?"$(\1:up,|$2)

"(CNY [-−]?\d+)[.,]10?" $1| un jiao
"(CNY [-−]?\d+)[.,](\d)0?" $1| $2| jiao
"(CNY [-−]?\d+[.,]\d)1" $1| $2| fen
"(CNY [-−]?\d+[.,]\d)(\d)" $1| $2| fen

"(([A-Z]{3}) [-−]?\d+)[.,](01)" $1|$(\2:ss,$(1))
"(([A-Z]{3}) [-−]?\d+)[.,](\d)" $1|$(\2:sp,$(\30))
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1|$(\2:sp,$3)

== ordinal(-masculine)? ==

1		primul


([-−]?\d+)	al $(ordinal $2)

(.*(opt|ilion|ard))		\2ulea
(.*)				\2lea

== ordinal-feminine ==

1		prima
([-−]?\d+)	a $(ordinal-feminine $1)

(.*)doi		\1doua
(.*)cinci	\1cincea
(.*)[uă]	\1a
(.*)sute	\1suta
(.*)mi[ei]	\1mia
(.*)ane		\1ana
(.*)		\1a

== ordinal-number ==

(\d+)	\1.

== help ==

"" $(1), |$(2)|, $(3)\n$(help ordinal-feminine)$(help ordinal-masculine)$(help ordinal-number)
(ordinal(-feminine|-masculine|-number)?) \1: $(\1 1), $(\1 2), $(\1 3)\n
`
modules['ru']=`
^0 ноль
1 один
2$ два
2 две
3 три
4 четыре
5 пять
6 шесть
7 семь
8 восемь
9 девять
10 десять
11 одиннадцать
12 двенадцать
13 тринадцать
14 четырнадцать
15 пятнадцать
16 шестнадцать
17 семнадцать
18 восемнадцать
19 девятнадцать
([23])(\d) $1|дцать[ $2]
4(\d) сорок[ $1]
9(\d) девяносто[ $1]
(\d)(\d) $1десят[ $2]
1(\d\d) сто[ $1]
2(\d\d) двести[ $1]
([34])(\d\d) $1ста[ $2]
(\d)(\d\d) $1сот[ $2]
1(\d{3}) одна тысяча[ $1]
([234]|\d?[02-9][234])(\d{3}) $1 тысячи[ $2]
(\d{1,3})(\d{3}) $1 тысяч[ $2]
1(\d{6}) один миллион[ $1]
(\d{1,3})(\d{6}) $1 миллионов[ $2]
1(\d{9}) один миллиард[ $1]
(\d{1,3})(\d{9}) $1 миллиардов[ $2]
1(\d{12}) один триллион[ $1]
(\d{1,3})(\d{12}) $1 триллионов[ $2]
1(\d{15}) один квадриллион[ $1]
(\d{1,3})(\d{15}) $1 квадриллионов[ $2]
1(\d{18}) один квинтиллион[ $1]
(\d{1,3})(\d{18}) $1 квинтиллионов[ $2]
1(\d{21}) один секстилион[ $1]
(\d{1,3})(\d{21}) $1 секстилионов[ $2]
1(\d{24}) один септиллион[ $1]
(\d{1,3})(\d{24}) $1 септиллионов[ $2]

# negative numbers

[-−]1 минус единица
[-−](\d+) минус |$1

# decimals

"1[.,]" одна целая
"([-−]?1)[.,]" $1 целая
"([-−]?\d+)[.,]" $1 целых
"([-−]?\d+[.,])(1)" $1| и одна десятая
"([-−]?0[.,])(\d)" $1| |$2 десятых
"([-−]?\d+[.,])(\d)" $1| и |$2 десятый
"([-−]?\d+[.,])([02-9]1)" $1| и $(f:|$2) сотая
"([-−]?\d+[.,])(\d\d)" $1| и |$2 сотых
"([-−]?\d+[.,])(\d[02-9]1)" $1| и $(f:|$2) тысячная
"([-−]?\d+[.,])(\d11)" $1| и $(f:|$2) тысячных
"([-−]?\d+[.,])(\d{3})" $1| и |$2 тысячный
"([-−]?\d+[.,])(\d)(\d)(\d)(\d)" $1| |$2 |$3 |$4 |$5
"([-−]?\d+[.,]\d*)(\d)" $1| |$2


# female conversion
f:(.*)один \1одна
f:(.*) \1

# currency

# unit/subunit

us:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \1
up:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \2
ug:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \3
ss:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \4
sp:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \5
sg:([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*) \6

EUR:(\D+) $(\1: евро, евро, евро, цент, цента, центов)
GBP:(\D+) $(\1: фунт стерлингов, фунт стерлингов, фунт стерлингов, пенни, пенса, пенсов)
RUB:(\D+) $(\1: рубль, рубля, рублей, копейка, копейки, копеек)
UAH:(\D+) $(\1: гривна, гривны, гривен, копейка, копейки, копеек)
USD:(\D+) $(\1: доллар США, доллара США, долларов США, цент, цента, центов)


"([A-Z]{3}) ([-−]?1)([.,]00?)?" $2|$(\1:us)
"([A-Z]{3}) ([-−]?\d*[02-9]1)([.,]00?)?" $2|$(\1:us)
"([A-Z]{3}) ([-−]?[234])([.,]00?)?" $2|$(\1:up)
"([A-Z]{3}) ([-−]?\d*[02-9][234])([.,]00?)?" $2|$(\1:up)
"([A-Z]{3}) ([-−]?\d+)([.,]00?)?" $2|$(\1:ug)

"((RUB) [-−]?\d+)[.,]([02-9])1" $1 $(\30) одна$(\2:ss)
"(([A-Z]{3}) [-−]?\d+)[.,](01)" $1 |$(1)$(\2:ss)
"((EUR|GBP|USD) [-−]?\d+)[.,]([02-9]2)" $1 $3|$(\2:sp)
"(([A-Z]{3}) [-−]?\d+)[.,]([02-9][234])" $1 |$3$(\2:sp)
"(([A-Z]{3}) [-−]?\d+)[.,](\d)" $1 |$(\30)$(\2:sg)
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1 |$3$(\2:sg)

== ordinal-number ==

(\d+)	\1.

== help ==

"" |$(1)|, |$(2)|, |$(3)|\n$(help ordinal-number)
(.*) \1: |$(\1 1)|, |$(\1 2)|, |$(\1 3)|\n
`
modules['sh']=`
#
# Regular number to text transducer for Serbian (Cyrillic) written in Soros
# Copyright (c) Goran Rakic <grakic@devbase.net> 2009.
#              
# Released under Creative Commons 3.0 Attribution - Share Alike license
# and relicensed under GNU Lesser General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Visit http://numbertext.org for more info on Soros language and syntax 
#

(\d{1,3})\.([\d.,]+) $(\1\2)

^0 nula
1 jedan
2 dva
3 tri
4 četiri
5 pet
6 šest
7 sedam
8 osam
9 devet
10 deset

11 jedanaest
14 četrnaest
16 šesnaest
1(\d) $1naest

4(\d) četrdeset[ $1]
5(\d) pedeset[ $1]
6(\d) šezdeset[ $1]
9(\d) devedeset[ $1]
(\d)(\d) $1deset[ $2]

1(\d\d) sto[ $1]
2(\d\d) dvesta[ $1]
3(\d\d) trista[ $1]
(\d)(\d\d) $1sto[ $2]

1(\d\d\d) hiljadu[ $1]
2(\d\d\d) dve hiljade[ $1]
([34])(\d\d\d) $1 hiljade[ $2]
(\d{0,1})1(\d)(\d\d\d) $(\11\2) hiljada[ $3]
(\d{1,2})1(\d\d\d) $(\10) jedna hiljada[ $2]
(\d{1,2})2(\d\d\d) $(\10) dve hiljade[ $2]
(\d{1,2})([34])(\d\d\d) $(\10) $2 hiljade[ $3]
(\d{1,3})(\d\d\d) $1 hiljada[ $2]

1(\d{6}) milion[ $1]
(\d{0,4})1(\d)(\d{6}) $(\11\2) miliona[ $3]
(\d{1,5})1(\d{6}) $(\10) jedan milion[ $2]
(\d{1,3})(\d{6}) $1 miliona[ $2]

1(\d{9}) milijarda[ $1]
2(\d{9}) dve milijarde[ $1]
([34])(\d{9}) $1 milijarde[ $2]
(\d{1,2})0(\d{9}) $(\10) milijardi[ $2]
(\d{0,1})1(\d)(\d{9}) $(\11\2) milijardi[ $3]
(\d{1,2})1(\d{9}) $(\10) jedna milijarda[ $2]
(\d{1,2})2(\d{9}) $(\10) dve milijarde[ $2]
(\d{1,2})([34])(\d{9}) $(\10) $2 milijarde[ $3]
(\d{1,3})(\d{9}) $1 milijarde[ $2]

1(\d{12}) bilion[ $1]
(\d{0,4})1(\d)(\d{12}) $(\11\2) biliona[ $3]
(\d{1,5})1(\d{12}) $(\10) jedan bilion[ $2]
(\d{1,6})(\d{12}) $1 biliona[ $2]

1(\d{18}) trilion[ $1]
(\d{0,4})1(\d)(\d{18}) $(\11\2) triliona[ $3]
(\d{1,5})1(\d{18}) $(\10) jedan trilion[ $2]
(\d{1,6})(\d{18}) $1 triliona[ $2]

1(\d{24}) kvadrilion[ $1]
(\d{0,4})1(\d)(\d{24}) $(\11\2) kvadriliona[ $3]
(\d{1,5})1(\d{24}) $(\10) jedan kvadrilion[ $2]
(\d{1,6})(\d{24}) $1 kvadriliona[ $2]

1(\d{30}) kvintilion[ $1]
(\d{0,4})1(\d)(\d{30}) $(\11\2) kvintiliona[ $3]
(\d{1,5})1(\d{30}) $(\10) jedan kvintilion[ $2]
(\d{1,6})(\d{30}) $1 kvintiliona[ $2]

1(\d{36}) sekstilion[ $1]
(\d{0,4})1(\d)(\d{36}) $(\11\2) sekstiliona[ $3]
(\d{1,5})1(\d{36}) $(\10) jedan sekstilion[ $2]
(\d{1,6})(\d{36}) $1 sekstiliona[ $2]

[-−](\d+) minus $1

# Decimal code by https://twitter.com/_uranium_
"([-−]?\d+)," $1| koma
"([-−]?\d+,)([^0]\d)" $1 $2
"([-−]?\d+,\d*[1-9]?)0+$" $1
"([-−]?\d+,)(\d)(\d)(\d)" $1| |$2 |$3 |$4 
"([-−]?\d+,\d*)(\d)" $1 |$2

== ordinal-number ==

(\d+)	\1.

== help ==

"" |$(1)|, |$(2)|, |$(3)|\n$(help ordinal-number)
(.*) \1: |$(\1 1)|, |$(\1 2)|, |$(\1 3)|\n
`
modules['sl']=`
^0 nič
1 ena
2$ dve
2 dva
3 tri
4 štiri
5 pet
6 šest
7 sedem
8 osem
9 devet
10 deset
11 enajst
1(\d) $1najst
20 dvajset
2(\d) $1indvajset
(\d)0 $1deset
(\d)(\d) $2in$1deset
1(\d\d) sto[ $1]
2(\d\d) dvesto[ $1]
(\d)(\d\d) $1sto[ $2]
1(\d\d\d) tisoč[ $1]
(\d{1,3})(\d\d\d) $1 tisoč[ $2]
1(\d{6}) milijon[ $1]
([234])(\d{6}) $1 milijona[ $2]
(\d{1,3})(\d{6}) $1 milijonov[ $2]
1(\d{9}) milijarda[ $1]
([234])(\d{9}) $1| milijardi[ $2]
(\d{1,3})(\d{9}) $1 milijardov[ $2]
1(\d{12}) bilijon[ $1]
([234])(\d{12}) $1 bilijona[ $2]
(\d{1,3})(\d{12}) $1 bilijonov[ $2]
1(\d{15}) tisoč bilijonov[ $1]
(\d{1,3})(\d{15}) $1 tisoč bilijonov[ $2]
1(\d{18}) trilijon[ $1]
([234])(\d{18}) $1 trilijona[ $2]
(\d{1,3})(\d{18}) $1 trilijonov[ $2]
1(\d{21}) tisoč trilijonov[ $1]
(\d{1,3})(\d{21}) $1 tisoč trilijonov[ $2]
1(\d{24}) kvadrilijon[ $1]
([234])(\d{24}) $1 kvadrilijona[ $2]
(\d{1,3})(\d{24}) $1 kvadrilijonov[ $2]

# negative number

[-−] minus
[-−](\d+) minus |$1

# decimals

"([-−]?\d+)[.,]" $1| vejica
"([-−]?\d+[.,])([^0]\d)" $1| |$2
"([-−]?\d+[.,])(\d)(\d)(\d)" $1| |$2 |$3 |$4
"([-−]?\d+[.,]\d*)(\d)" $1| |$2

# currency

# unit/subunit affixation

u1:([^,]*)(,[^,]*){9} \1
u2:([^,]*,){1}([^,]*)(,[^,]*){8} \2
u3:([^,]*,){2}([^,]*)(,[^,]*){7} \2
u4:([^,]*,){3}([^,]*)(,[^,]*){6} \2
u5:([^,]*,){4}([^,]*)(,[^,]*){5} \2
s1:([^,]*,){5}([^,]*)(,[^,]*){4} \2
s2:([^,]*,){6}([^,]*)(,[^,]*){3} \2
s3:([^,]*,){7}([^,]*)(,[^,]*){2} \2
s4:([^,]*,){8}([^,]*)(,[^,]*){1} \2
s5:([^,]*,){9}([^,]*) \2

CHF:(.+) $(\1: švicarski frank, švicarska franka, švicarski franki, švicarske franke, švicarskih frankov, centim, centima, centimi, centime, centimov)
EUR:(.+) $(\1: evro, evra, evri, evre, evrov, cent, centa, centi, cente, centov)
GBP:(.+) $(\1: funt šterling, funta šterlinga, funti šterlingi, funte šterlinge, funtov šterlingov, peni, penija, peniji, penije, penijev)
JPY:(.+) $(\1: japonski jen, japonska jena, japonski jeni, japonske jene, japonskih jenov, sen, sena, seni, sene, senov)
USD:(.+) $(\1: ameriški dolar, ameriška dolarja, ameriški dolarji, ameriške dolarje, ameriških dolarjev, cent, centa, centi, cente, centov)

"([A-Z]{3}) ([-−]?)1([.,]00?)?" $2 en$(\1:u1)
"([A-Z]{3}) ([-−]?\d*01)([.,]00?)?" $2$(\1:u1)
"([A-Z]{3}) ([-−]?(2|\d*02))([.,]00?)?" $2$(\1:u2)
"([A-Z]{3}) ([-−]?(3|\d*03))([.,]00?)?" $2$(\1:u3)
"([A-Z]{3}) ([-−]?(4|\d*04))([.,]00?)?" $2$(\1:u4)
"([A-Z]{3}) ([-−]?\d+)([.,]00?)?" $2$(\1:u5)

"(([A-Z]{3}) [-−]?\d+)[.,](01)" $1 en$(\2:s1)
"(([A-Z]{3}) [-−]?\d+)[.,](02)" $1 $3$(\2:s2)
"(([A-Z]{3}) [-−]?\d+)[.,](03)" $1 $3$(\2:s3)
"(([A-Z]{3}) [-−]?\d+)[.,](04)" $1 $3$(\2:s4)
"(([A-Z]{3}) [-−]?\d+)[.,](\d)" $1 $(\30)$(\2:s5)
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1 $3$(\2:s5)

== ordinal-number ==

(\d+)	\1.

== help ==

"" |$(1)|, |$(2)|, |$(3)|\n$(help ordinal-number)
(.*) \1: |$(\1 1)|, |$(\1 2)|, |$(\1 3)|\n
`
modules['sr']=`
#
# Regular number to text transducer for Serbian (Cyrillic) written in Soros
# Copyright (c) Goran Rakic <grakic@devbase.net> 2009.
#              
# Released under Creative Commons 3.0 Attribution - Share Alike license
# and relicensed under GNU Lesser General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Visit http://numbertext.org for more info on Soros language and syntax 
#

(\d{1,3})\.([\d.,]+) $(\1\2)

^0 нула
1 један
2 два
3 три
4 четири
5 пет
6 шест
7 седам
8 осам
9 девет
10 десет

11 једанаест
14 четрнаест
16 шеснаест
1(\d) $1наест

4(\d) четрдесет[ $1]
5(\d) педесет[ $1]
6(\d) шездесет[ $1]
9(\d) деведесет[ $1]
(\d)(\d) $1десет[ $2]

1(\d\d) сто[ $1]
2(\d\d) двеста[ $1]
3(\d\d) триста[ $1]
(\d)(\d\d) $1сто[ $2]

1(\d\d\d) хиљаду[ $1]
2(\d\d\d) две хиљаде[ $1]
([34])(\d\d\d) $1 хиљаде[ $2]
(\d{0,1})1(\d)(\d\d\d) $(\11\2) хиљада[ $3]
(\d{1,2})1(\d\d\d) $(\10) једна хиљада[ $2]
(\d{1,2})2(\d\d\d) $(\10) две хиљаде[ $2]
(\d{1,2})([34])(\d\d\d) $(\10) $2 хиљаде[ $3]
(\d{1,3})(\d\d\d) $1 хиљада[ $2]

1(\d{6}) милион[ $1]
(\d{0,4})1(\d)(\d{6}) $(\11\2) милиона[ $3]
(\d{1,5})1(\d{6}) $(\10) један милион[ $2]
(\d{1,3})(\d{6}) $1 милиона[ $2]

1(\d{9}) милијарда[ $1]
2(\d{9}) две милијарде[ $1]
([34])(\d{9}) $1 милијарде[ $2]
(\d{1,2})0(\d{9}) $(\10) милијарди[ $2]
(\d{0,1})1(\d)(\d{9}) $(\11\2) милијарди[ $3]
(\d{1,2})1(\d{9}) $(\10) једна милијарда[ $2]
(\d{1,2})2(\d{9}) $(\10) две милијарде[ $2]
(\d{1,2})([34])(\d{9}) $(\10) $2 милијарде[ $3]
(\d{1,3})(\d{9}) $1 милијарде[ $2]

1(\d{12}) билион[ $1]
(\d{0,4})1(\d)(\d{12}) $(\11\2) билионa[ $3]
(\d{1,5})1(\d{12}) $(\10) један билион[ $2]
(\d{1,6})(\d{12}) $1 билиона[ $2]

1(\d{18}) трилион[ $1]
(\d{0,4})1(\d)(\d{18}) $(\11\2) трилиона[ $3]
(\d{1,5})1(\d{18}) $(\10) један трилион[ $2]
(\d{1,6})(\d{18}) $1 трилиона[ $2]

1(\d{24}) квадрилион[ $1]
(\d{0,4})1(\d)(\d{24}) $(\11\2) квадрилиона[ $3]
(\d{1,5})1(\d{24}) $(\10) један квадрилион[ $2]
(\d{1,6})(\d{24}) $1 квадрилиона[ $2]

1(\d{30}) квинтилион[ $1]
(\d{0,4})1(\d)(\d{30}) $(\11\2) квинтилиона[ $3]
(\d{1,5})1(\d{30}) $(\10) један квинтилион[ $2]
(\d{1,6})(\d{30}) $1 квинтилиона[ $2]

1(\d{36}) секстилион[ $1]
(\d{0,4})1(\d)(\d{36}) $(\11\2) секстилиона[ $3]
(\d{1,5})1(\d{36}) $(\10) један секстилион[ $2]
(\d{1,6})(\d{36}) $1 секстилиона[ $2]

[-−](\d+) минус $1

# Decimal code by https://twitter.com/_uranium_
"([-−]?\d+)," $1| кома
"([-−]?\d+,)([^0]\d)" $1 $2
"([-−]?\d+,\d*[1-9]?)0+$" $1
"([-−]?\d+,)(\d)(\d)(\d)" $1| |$2 |$3 |$4 
"([-−]?\d+,\d*)(\d)" $1 |$2

== ordinal-number ==

(\d+)	\1.

== help ==

"" |$(1)|, |$(2)|, |$(3)|\n$(help ordinal-number)
(.*) \1: |$(\1 1)|, |$(\1 2)|, |$(\1 3)|\n
`
modules['sv']=`
^0 noll
^1$ ett
^1 en
1 ett
2 två
3 tre
4 fyra
5 fem
6 sex
7 sju
8 åtta
9 nio
10 tio
11 elva
12 tolv
13 tretton
14 fjorton
15 femton
16 sexton
17 sjutton
18 arton
19 nitton
2(\d) tjugo$1
3(\d) trettio$1
4(\d) fyrtio$1
7(\d) sjuttio$1
8(\d) åttio$1
9(\d) nittio$1
(\d)(\d) $1tio$2
(\d)(\d\d) $1|hundra$2

# “ettusen” instead of “etttusen”

(1|\d?[02-9]1)(\d{3}) $1|usen[ $2]

(\d{1,3})(\d{3}) $1tusen[ $2]
(\d{1,3})(\d{6}) |$1 miljon$(pl:\1)[ $2]
(\d{1,3})(\d{9}) |$1 miljard$(pl:\1)[ $2]
(\d{1,3})(\d{12}) |$1 biljon$(pl:\1)[ $2]
(\d{1,3})(\d{15}) |$1 biljard$(pl:\1)[ $2]
(\d{1,3})(\d{18}) |$1 triljon$(pl:\1)[ $2]
(\d{1,3})(\d{21}) |$1 triljard$(pl:\1)[ $2]
(\d{1,3})(\d{24}) |$1 kvadriljon$(pl:\1)[ $2]

# plural for big numbers
pl:1
pl:.* er

# negative number

[-−](\d+) minus |$1

# decimals

"([-−]?\d+)[.,]" $1| komma
"([-−]?\d+[.,])([^0]\d)" $1| |$2
"([-−]?\d+[.,])(\d)(\d)(\d)" $1| |$2 |$3 |$4
"([-−]?\d+[.,]\d*)(\d)" $1| |$2

# currency

# unit/subunit singular/plural
"us, (.*): (.*), (.*), (.*), (.*), (.*), (.*)" $(\2 \1) \3
"up, (.*): (.*), (.*), (.*), (.*), (.*), (.*)" $(\2 \1) \4
"ss, (.*): (.*), (.*), (.*), (.*), (.*), (.*)" $(\5 \1) \6
"sp, (.*): (.*), (.*), (.*), (.*), (.*), (.*)" $(\5 \1) \7

CHF:(\D+,.*) $(\1: cardinal, schweizisk franc, schweizisk franc, cardinal, centime, centime)
CNY:(\D+,.*) $(\1: cardinal, yuan renminbi, yuan renminbi, cardinal, fen, fen)
EUR:(\D+,.*) $(\1: cardinal, euro, euro, cardn, cent, cent)
GBP:(\D+,.*) $(\1: cardinal-neuter, brittiskt pund, brittiskt pund, cardinal, penny, pence)
JPY:(\D+,.*) $(\1: cardinal, yen, yen, cardinal, sen, sen)
SEK:(\D+,.*) $(\1: cardinal, svensk krona, svenska kronor, cardinal-neuter, öre, öre)
USD:(\D+,.*) $(\1: cardinal, US-dollar, US-dollar, cardinal-neuter, cent, cent)

"([A-Z]{3}) ([-−]?1)([.,]00?)?"$(\1:us, \2)
"([A-Z]{3}) ([-−]?\d+)([.,]00?)?"$(\1:up, \2)

"(CNY [-−]?\d+)[.,]10?" $1 $2 jiao
"(CNY [-−]?\d+)[.,](\d)0?" $1 $2 jiao
"(CNY [-−]?\d+[.,]\d)1" $1 $2 fen
"(CNY [-−]?\d+[.,]\d)(\d)" $1 $2 fen

"(([A-Z]{3}) [-−]?\d+)[.,](01)" $1$(\2:ss, 1)
"(([A-Z]{3}) [-−]?\d+)[.,](\d)" $1$(\2:sp, \30)
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1$(\2:sp, \3)

== cardinal-neuter ==

1 ett

== cardinal(-feminine|-masculine|-neuter)? ==

([-−]?\d+) $(cardinal |$2)
"(.*[^ ]e)t(tusen.*)" $(cardinal \2n\3)	# 21000, 31000 .. 991000
"(.*e)tt([ ].*|$)" $(cardinal \2n\3)	# !etthundra, !ettusen
(.*) \2

== ordinal(-masculine)? ==

([-−]?\d+) $(ordinal |$2)

== ordinal ==

(.*)ett		\1förste	# 1
(.*)två		\1andre		# 2
(.*)tre		\1tredje	# 3
(.*)fyra	\1fjärde	# 4
(.*)sex		\1sjätte	# 6
(.*(sju|io))	\1nde		# 7, 9, 10, 20..90
(.*)åtta	\1åttonde	# 8
(.*)elva	\1elfte		# 11
(.*)tolv	\1tolfte	# 12
"(.*(ton|hundra|tusen)) *" \1de	# 13, 14..19, 100, 1000
"(.*)er *"	\1te		# milljoner...
"(.*[^ ]) *"	\1te		# 0, 5, milljon...

== ordinal-feminine ==

([-−]?\d+) $(ordinal-feminine $(ordinal |$1))
(.*(först|andr))e \1a	# 1, 2
(.*)	\1

== ordinal-neuter ==

(.*)	$(ordinal-feminine |$1)

== ordinal-number(-feminine|-neuter)? ==

(.*[02-9][12]|[12])	\2:a

== ordinal-number(-feminine|-neuter|-masculine)? ==

(.*)	\2:e

== year ==

([-−]?(1[1-9]|[2-9]\d))(\d\d) $1hundra$3
(.*) $1

== help ==

"" $(1)|, $(2), $(3)\n$(\0 cardinal-feminine)$(\0 cardinal-masculine)$(\0 cardinal-neuter)$(\0 ordinal-feminine)$(\0 ordinal-masculine)$(\0 ordinal-neuter)$(\0 ordinal-number)$(\0 ordinal-number-feminine)$(\0 ordinal-number-masculine)
((ordinal|cardinal)(-number)?(-feminine|-masculine|-neuter)?) \1: $(\1 1), $(\1 2), $(\1 3)\n
`
modules['th']=`
^0 ศูนย์
^1 หนึ่ง
1 เอ็ด
2 สอง
3 สาม
4 สี่
5 ห้า
6 หก
7 เจ็ด
8 แปด
9 เก้า
1(\d) สิบ$1
2(\d) ยี่สิบ$1
(\d)(\d) $1สิบ$2
(\d)(\d\d) $1ร้อย$2
(\d)(\d{3}) $1พัน$2
(\d)(\d{4}) $1หมื่น$2
(\d)(\d{5}) $1แสน$2
(\d)(\d{6}) $1ล้าน$2
(\d\d)(\d{6}) $1ล้าน$2
(\d)(\d{8}) $1ร้อยล้าน$2
(\d)(\d{9}) $1พันล้าน$2
(\d)(\d{10}) $1หมื่นล้าน$2
(\d)(\d{11}) $1แสนล้าน$2
(\d)(\d{12}) $1ล้านล้าน$2
(\d\d)(\d{12}) $1ล้านล้าน$2
(\d)(\d{14}) $1ร้อยล้านล้าน$2
(\d)(\d{15}) $1พันล้านล้าน$2
(\d)(\d{16}) $1หมื่นล้านล้าน$2
(\d)(\d{17}) $1แสนล้านล้าน$2
(\d)(\d{18}) $1ล้านล้านล้าน$2
(\d\d)(\d{18}) $1ล้านล้านล้าน$2
(\d)(\d{20}) $1ร้อยล้านล้านล้าน$2
(\d)(\d{21}) $1พันล้านล้านล้าน$2
(\d)(\d{22}) $1หมื่นล้านล้านล้าน$2
(\d)(\d{23}) $1แสนล้านล้านล้าน$2
(\d)(\d{24}) $1ล้านล้านล้านล้าน$2

# negative numbers

[-−](\d+) ลบ|$1

# decimals

([-−]?\d+)[.,] |$1|จุด
([-−]?\d+[.,]\d*)(\d) |$1|$2

# currency

"THB ([-−]?\d+)" $1บาทถ้วน

# currency with decimals

"(THB [-−]?\d+)[,.]00" $1
"THB ([-−]?\d+)[,.](\d{1,2})" $1บาท$2สตางค์
 
# other currencies?

[A-Z]{3}
"([A-Z]{3}) ([-−]?\d[\d.,]*)" $2$1

== ordinal ==

([-−]?\d+([.,]\d+)?) ที่$1

== ordinal-number ==

(\d+)	\1.

== help ==

"" |$(1)|, |$(2)|, |$(3)|\n$(help ordinal)$(help ordinal-number)
(.*) \1: |$(\1 1)|, |$(\1 2)|, |$(\1 3)|\n
`
modules['tr']=`
^0 sıfır
1 bir
2 iki
3 üç
4 dört
5 beş
6 altı
7 yedi
8 sekiz
9 dokuz
1(\d) on[ $1]
2(\d) yirmi[ $1]
3(\d) otuz[ $1]
4(\d) kırk[ $1]
5(\d) elli[ $1]
6(\d) altmış[ $1]
7(\d) yetmiş[ $1]
8(\d) seksen[ $1]
9(\d) doksan[ $1]

(1)(\d\d)  yüz[ $2]			# yüz ..
([2-9])(\d\d) $1 yüz[ $2]		# üç yüz ...
(1)(\d\d\d)  bin[ $2]			# bin
(\d{1,2})([1-9]\d\d) $1 bin[ $2]	# on bin iki yüz
(\d{1,3})(\d{3}) $1 bin[ $2]		# yüz bin iki yüz
(\d{1,3})(\d{6}) $1 milyon[ $2]
(\d{1,3})(\d{9}) $1 milyar[ $2]
(\d{1,3})(\d{12}) $1 trilyon[ $2]
(\d{1,3})(\d{15}) $1 katrilyon[ $2]
(\d{1,3})(\d{18}) $1 kentilyon[ $2]
(\d{1,3})(\d{21}) $1 sekstilyon[ $2]
(\d{1,3})(\d{24}) $1 septilyon[ $2]

# negative number

[-−](\d+) negatif |$1

# decimals

([-−]?\d+)[.,] $1| virgül
"([-−]?\d+[.,]0*)(\d+)" $1 |$2
([-−]?\d+[.,]\d*)(\d) $1| |$2

# currency

# unit/subunit singular/plural

us:([^,]*),([^,]*),([^,]*),([^,]*) \1
up:([^,]*),([^,]*),([^,]*),([^,]*) \2
ss:([^,]*),([^,]*),([^,]*),([^,]*) \3
sp:([^,]*),([^,]*),([^,]*),([^,]*) \4

AUD:(\D+) $(\1: Avustralya doları, Avustralya doları, sent, sent)
BGN:(\D+) $(\1: Bulgar levası, Bulgar levası, stotinka, stotinki)
BWP:(\D+) $(\1: Botswana pulası, Botswana pulası, thebe, thebe)
CAD:(\D+) $(\1: Kanada doları, Canadian dollars, sent, sent)
CHF:(\D+) $(\1: İsviçre frangı, İsviçre frangı, santim, santim)
CNY:(\D+) $(\1: Çin yuanı, Çin yuanı, fen, fen)
CZK:(\D+) $(\1: Çek korunası, Çek korunası, heller, heller)
EEK:(\D+) $(\1: Estonya kronu, Estonya kronu,	sent, sent)
EUR:(\D+) $(\1: euro, euro, sent, sent)
GBP:(\D+) $(\1: sterlin, sterlin, peni, peni)
GHS:(\D+) $(\1: Gana sedisi, Gana sedisi, peseva, peseva)
GMD:(\D+) $(\1: Gambiya dalası, Gambiya dalası, butut, butut)
HKD:(\D+) $(\1: Hong Kong doları, Hong Kong doları, sent, sent)
HRK:(\D+) $(\1: Hırvatistan kunası, Hırvatistan kunası, lipa, lipa)
HUF:(\D+) $(\1: Macar forinti, Macar forinti, filler, filler)
INR:(\D+) $(\1: Hindistan rupisi, Hindistan rupisi, paise, paise)
JMD:(\D+) $(\1: Jamaika doları, Jamaika doları, sent, sent)
JPY:(\D+) $(\1: Japon yeni, Japon yeni, sen, sen)
KES:(\D+) $(\1: Kenya şilini, Kenya şilini, sent, sent)
LRD:(\D+) $(\1: Liberya doları, Liberya doları, sent, sent)
LSL:(\D+) $(\1: Lesotho loti, maloti, sente, lisente)
LTL:(\D+) $(\1: Litvanya litası, Litvanya litası, centas, centai)
LVL:(\D+) $(\1: Letonya latı, Letonya latı, santims, santimi)
MGA:(\D+) $(\1: ariary, ariaries, iraimbilanja, iraimbilanja)
MUR:(\D+) $(\1: Mauritius rupisi, Mauritius rupisi, sent, sent)
MXN:(\D+) $(\1: Meksika pezosu, Meksika pezosu, sentavo, sentavo)
MWK:(\D+) $(\1: Malawian kwacha, Malawian kwacha, tambala, tambala)
NAD:(\D+) $(\1: Namibya doları, Namibya doları, sent, sent)
NGN:(\D+) $(\1: Nijerya nairası, Nijerya nairası, kobo, kobo)
NZD:(\D+) $(\1: Yeni Zelanda doları, Yeni Zelanda doları, sent, sent)
PGK:(\D+) $(\1: Papua Yeni Gine kinası, Papua Yeni Gine kinası, toea, toea)
PHP:(\D+) $(\1: Filipinler pezosu, Filipinler pezosu, sentavo, sentavo)
PKR:(\D+) $(\1: Pakistan rupisi, Pakistan rupisi, paisa, paisa)
PLN:(\D+) $(\1: Polonya zlotisi, Polonya zlotisi, grosz, groszy)
RON:(\D+) $(\1: Romen leyi, Romen leyi, ban, ban)
RSD:(\D+) $(\1: Sırbistan dinarı, Sırbistan dinarı, para, para)
RUB:(\D+) $(\1: Rus rublesi, Rus rublesi, kopek, kopek)
RWF:(\D+) $(\1: Ruanda frangı, Ruanda frangı, santim, santim)
SDG:(\D+) $(\1: Sudan poundu, Sudan poundu, piastre, piastres)
SGD:(\D+) $(\1: Singapur doları, Singapur doları, sent, sent)
SLL:(\D+) $(\1: Sierra Leone leonu, Sierra Leone leonu, sent, sent)
SZL:(\D+) $(\1: lilangeni, emalangeni, cent, cents)
THB:(\D+) $(\1: Tayland bahtı, Tayland bahtı, satang, satang)
TRY:(\D+) $(\1: Türk lirası, Türk lirası, kuruş, kuruş)
TTD:(\D+) $(\1: Trinidad ve Tobago doları, Trinidad ve Tobago doları, sent, sent)
TZS:(\D+) $(\1: Tanzanya şilini, Tanzanya şilini, sent, sent)
UAH:(\D+) $(\1: Ukrayna hryvnyası, Ukrayna hryvnyası, kopiyka, kopiyka)
UGX:(\D+) $(\1: Uganda şilini, Uganda şilini, sent, sent)
USD:(\D+) $(\1: ABD doları, ABD doları, sent, sent)
X[AO]F:(\D+) $(\1: CFA franc, CFA francs, centime, centimes)
ZAR:(\D+) $(\1: Güney Afrika randı, Güney Afrika randı, sent, sent)
ZMK:(\D+) $(\1: Zambiya kıvaçası, Zambiya Kıvaçası, ngwee, ngwee)
ZWD:(\D+) $(\1: Zimbabve doları, Zimbabve doları, sent, sent)

"(JPY [-−]?\d+)[.,](\d\d)0" $1
"(JPY [-−]?\d+[.,]\d\d)(\d)" $1 $2 rin

# removing spaces from number names before currencies

"space:([^ ]+) +([^ ].*)" \1$(space:\2)
space:(.*) \1

"([A-Z]{3}) ([-−]?1)([.,]00?)?" $2$(\1:us)
"([A-Z]{3}) ([-−]?\d+)([.,]00?)?" $(space:|$2)$(\1:up)

"(CNY [-−]?\d+)[.,](\d)0?" $1 $2 jiao
"(CNY [-−]?\d+[.,]\d)(\d)" $1 $2 fen

"((MGA|MRO) [-−]?\d+)[.,]0" $1
"((MGA|MRO) [-−]?\d+)[.,]2" $1 |$(1)$(\2:ss)
"((MGA|MRO) [-−]?\d+)[.,]4" $1 |$(2)$(\2:sp)
"((MGA|MRO) [-−]?\d+)[.,]6" $1 |$(3)$(\2:sp)
"((MGA|MRO) [-−]?\d+)[.,]8" $1 |$(4)$(\2:sp)

"(([A-Z]{3}) [-−]?\d+)[.,](01)" $1 |$(1)$(\2:ss)
"(([A-Z]{3}) [-−]?\d+)[.,](\d)" $1 |$(\30)$(\2:sp)
"(([A-Z]{3}) [-−]?\d+)[.,](\d\d)" $1 $(space:|$3)$(\2:sp)

== ordinal-number ==

(\d+)	\1.

== help ==

"" |$(1)|, |$(2)|, |$(3)|\n$(help cardinal-neuter)$(help cardinal-feminine)$(help cardinal-masculine)$(help ordinal)$(help ordinal-number)
(.*) \1: |$(\1 1)|, |$(\1 2)|, |$(\1 3)|\n
`
modules['vi']=`
^0$ không
1 một
2 hai
3 ba
4 bốn
^5$ năm
5$ lăm
5 năm
6 sáu
7 bảy
8 tám
9 chín
1(\d) mười[ $1]
(\d)0 $1 mươi
(\d)1 $1 mươi mốt
(\d)(\d) $1 mươi[ $2]

(\d)01 $1 trăm linh một
(\d)(\d\d) $1 trăm[ $2]

(\d{1,3})000 $1 ngàn
(\d{1,3})001 $1 ngàn không trăm linh một
(\d{1,3})0(\d\d) $1 ngàn không trăm[ $2]
(\d{1,3})(\d\d\d) $1 ngàn[ $2]

(\d{1,3})0{6} $1 triệu
(\d{1,3})0{5}1 $1 triệu không trăm linh một
(\d{1,3})0{4}(\d\d) $1 triệu không trăm[ $2]
(\d{1,3})(\d{6}) $1 triệu[ $2]

(\d{1,10})0{9} $1 tỷ
(\d{1,10})0{8}1 $1 tỷ không trăm linh một
(\d{1,10})0{7}(\d\d) $1 tỷ không trăm[ $2]
(\d{1,10})(\d{9}) $1 tỷ[ $2]

== ordinal-number ==

(\d+)	\1.

== help ==

"" |$(1)|, |$(2)|, |$(3)|\n$(help ordinal-number)
(.*) \1: |$(\1 1)|, |$(\1 2)|, |$(\1 3)|\n
`
modules['zh']=`
# Mandarin Chinese number names (simplified)
^0 零
1 一
2$ 二
2 两
3 三
4 四
5 五
6 六
7 七
8 八
9 九
^1(\d) 十$1
(\d)(\d) $1|十$2
(\d)0{2} $1百
(\d)0(\d) $1百零$2
(\d)(\d\d) $1百$2
(\d)0{3} $1千
(\d)0(\d\d) $1千零$2
(\d)(\d\d\d) $1千$2
(\d{1,4})0{4} $1|万
(\d{1,4})0(\d{3}) $1|万零$2
(\d{1,4})(\d{4}) $1|万$2
(\d{1,4})0{8} $1|亿
(\d{1,4})0(\d{7}) $1|亿零$2
(\d{1,4})(\d{8}) $1|亿$2
(\d{1,4})0{12} $1|兆
(\d{1,4})0(\d{11}) $1|兆零$2
(\d{1,4})(\d{12}) $1|兆$2
(\d{1,4})0{16} $1|京
(\d{1,4})0(\d{15}) $1|京零$2
(\d{1,4})(\d{16}) $1|京$2
(\d{1,4})0{20} $1|垓
(\d{1,4})0(\d{19}) $1|垓零$2
(\d{1,4})(\d{20}) $1|垓$2
(\d{1,4})0{24} $1|秭
(\d{1,4})0(\d{23}) $1|秭零$2
(\d{1,4})(\d{24}) $1|秭$2
(\d{1,4})0{28} $1|穰
(\d{1,4})0(\d{27}) $1|穰零$2
(\d{1,4})(\d{28}) $1|穰$2
(\d{1,4})0{32} $1|沟
(\d{1,4})0(\d{31}) $1|沟零$2
(\d{1,4})(\d{32}) $1|沟$2
(\d{1,4})0{36} $1|涧
(\d{1,4})0(\d{35}) $1|涧零$2
(\d{1,4})(\d{36}) $1|涧$2
(\d{1,4})0{40} $1|正
(\d{1,4})0(\d{39}) $1|正零$2
(\d{1,4})(\d{40}) $1|正$2
(\d{1,4})0{44} $1|载
(\d{1,4})0(\d{43}) $1|载零$2
(\d{1,4})(\d{44}) $1|载$2

# negative numbers

[-−](\d+) 负|$1

# decimals

"([-−]?\d+)[.,]" "$1|点"
"([-−]?\d+[.,]\d*)(\d)" $1||$2

# currency

# unit/subunit singular/plural

AUD 澳大利亚元
CHF 瑞士法郎
CNY 人民币
EUR 歐元
GBP 英镑
HKD 港元
JPY 日圓
MOP 澳門幣
USD 美元

# 1/10 角
# 1/100 分

"([A-Z]{3}) ([-−]?\d+([.,]\d+)?)" $2$1

# Mandarin Chinese number names, formal numbers (大写) for legal and financial documents, simplified

== formal ==

^0 零
1 壹
2$ 贰
2 贰
3 叁
4 贰
5 伍
6 陆
7 柒
8 捌
9 玖
^1(\d) 拾$(formal 1)
(\d)(\d) $(formal 1)|拾$(formal 2)
(\d)0{2} $(formal 1)佰
(\d)0(\d) $(formal 1)佰零$(formal 2)
(\d)(\d\d) $(formal 1)佰$(formal 2)
(\d)0{3} $(formal 1)仟
(\d)0(\d\d) $(formal 1)仟零$(formal 2)
(\d)(\d\d\d) $(formal 1)仟$(formal 2)
(\d{1,4})0{4} $(formal 1)|萬
(\d{1,4})0(\d{3}) $(formal 1)|萬零$(formal 2)
(\d{1,4})(\d{4}) $(formal 1)|萬$(formal 2)
(\d{1,4})0{8} $(formal 1)|億
(\d{1,4})0(\d{7}) $(formal 1)|亿零$(formal 2)
(\d{1,4})(\d{8}) $(formal 1)|亿$(formal 2)
(\d{1,4})0{12} $(formal 1)|兆
(\d{1,4})0(\d{11}) $(formal 1)|兆零$(formal 2)
(\d{1,4})(\d{12}) $(formal 1)|兆$(formal 2)
(\d{1,4})0{16} $(formal 1)|京
(\d{1,4})0(\d{15}) $(formal 1)|京零$(formal 2)
(\d{1,4})(\d{16}) $(formal 1)|京$(formal 2)
(\d{1,4})0{20} $(formal 1)|垓
(\d{1,4})0(\d{19}) $(formal 1)|垓零$(formal 2)
(\d{1,4})(\d{20}) $(formal 1)|垓$(formal 2)
(\d{1,4})0{24} $(formal 1)|秭
(\d{1,4})0(\d{23}) $(formal 1)|秭零$(formal 2)
(\d{1,4})(\d{24}) $(formal 1)|秭$(formal 2)
(\d{1,4})0{28} $(formal 1)|穰
(\d{1,4})0(\d{27}) $(formal 1)|穰零$(formal 2)
(\d{1,4})(\d{28}) $(formal 1)|穰$(formal 2)
(\d{1,4})0{32} $(formal 1)|沟
(\d{1,4})0(\d{31}) $(formal 1)|沟零$(formal 2)
(\d{1,4})(\d{32}) $(formal 1)|沟$(formal 2)
(\d{1,4})0{36} $(formal 1)|涧
(\d{1,4})0(\d{35}) $(formal 1)|涧零$(formal 2)
(\d{1,4})(\d{36}) $(formal 1)|涧$(formal 2)
(\d{1,4})0{40} $(formal 1)|正
(\d{1,4})0(\d{39}) $(formal 1)|正零$(formal 2)
(\d{1,4})(\d{40}) $(formal 1)|正$(formal 2)
(\d{1,4})0{44} $(formal 1)|载
(\d{1,4})0(\d{43}) $(formal 1)|载零$(formal 2)
(\d{1,4})(\d{44}) $(formal 1)|载$(formal 2)

# negative numbers

[-−](\d+) 负|$(formal 1)

# decimals

"([-−]?\d+)[.,]" "$(formal 1)|点"
"([-−]?\d+[.,]\d*)(\d)" $(formal 1)||$(formal 2)

# currency

# unit/subunit singular/plural

AUD 澳大利亚元
CHF 瑞士法郎
CNY 人民币
EUR 歐元
GBP 英镑
HKD 港元
JPY 日圓
MOP 澳門幣
USD 美元

# 1/10 角
# 1/100 分

"([A-Z]{3}) ([-−]?\d+([.,]\d+)?)" $(formal 2)$(formal 1)

== help ==

"" |$(1)|, |$(2)|, |$(3)|\n$(help formal)
(formal) \1: |$(\1 1)|, |$(\1 2)|, |$(\1 3)|\n
`
<!-- **************************************************************************************************** -->
<
<!-- **************************************************************************************************** -->
function Soros(program, lang) {
    this.funcpat = /(\|?(\uE008\()+)?(\|?\uE008\(([^\(\)]*)\)\|?)(\)+\|?)?/
    this.meta = "\\\"$()|#;[]"
    this.enc = "\uE000\uE001\uE002\uE003\uE004\uE005\uE006\uE007\uE008\uE009"
    this.lines = []
    if (!/__numbertext__/.test(program))
        program = "__numbertext__;" + program

    program = program.replace("__numbertext__",
        // default left zero deletion
        "\"([a-z][-a-z]* )?0+(0|[1-9]\\d*)\" $(\\1\\2);" +
        // separator function
        "\"\uE00A(.*)\uE00A(.+)\uE00A(.*)\" \\1\\2\\3;" +
        // no separation, if subcall returns with empty string
        "\"\uE00A.*\uE00A\uE00A.*\"")

    // subclass for line data
    this.linetype = function (regex, repl, begin, end) {
        this.pat = regex
        this.repl = repl
        this.begin = begin
        this.end = end
    };

    // strip function
    this.strip = function (st, ch) {
        if (st == undefined) return ""
        return st.replace(new RegExp("^" + ch + "+"), "")
            .replace(new RegExp(ch + "+$"), "")
    };

    // character translation function
    this.tr = function (text, chars, chars2, delim) {
        for (var i = 0; i < chars.length; i++) {
            var s = delim + chars[i]
            while (text.indexOf(s) >= 0) {
                text = text.replace(s, chars2[i]);
            }
        }
        return text
    };

    // private run function
    this._run = function (data, begin, end) {
        for (var i in this.lines) {
            var l = this.lines[i]
            if (! ((!begin && l.begin) || (!end && l.end))) {
                var m = l.pat.exec(data)
                if (m != null) {
                    var s = data.replace(l.pat, l.repl)
                    var n = this.funcpat.exec(s)
                    while (n != null) {
                        var b = false
                        var e = false
                        if (n[3][0] == "|" || n[0][0] == "|") {
                            b = true
                        } else if (n.index == 0) {
                            b = begin
                        }
                        if (n[3][n[0].length - 1] == "|" || n[3][n[0].length - 1] == "|") {
                            e = true
                        } else if (n.index + n[0].length == s.length) {
                            e = end
                        }
                        s = s.substring(0, n.index + (n[1] == undefined ? 0 : n[1].length)) + this._run(n[4], b, e) +
                            s.substring(n.index + (n[1] == undefined ? 0 : n[1].length) + n[3].length)
                        n = this.funcpat.exec(s)
                    }
                    return s
                }
            }
        }
        return ""
    };

    // run with the string input parameter
    this.run = function (data) {
        data = this._run(this.tr(data, this.meta, this.enc, ""), true, true)
        return this.tr(data, this.enc, this.meta, "")
    };

    // constructor
//    program = program.replace(/\\\\/g, "\uE000")
//    program = program.replace(/\\[(]/g, "\uE003")
//    program = program.replace(/\\[)]/g, "\uE004")
//    program = program.replace(/\\[|]/g, "\uE005")
    program = this.tr(program, this.meta, this.enc, "\\")
    // switch off all country-dependent lines, and switch on the requested ones
    program = program.replace(/(^|[\n;])([^\n;#]*#[^\n]*[[]:[^\n:\]]*:][^\n]*)/g, "$1#$2")
        .replace(new RegExp("(^|[\n;])#([^\n;#]*#[^\n]*[[]:" + lang.replace("_", "-") + ":][^\n]*)", "g"), "$1$2")
    var l = program.replace(/(#[^\n]*)?(\n|$)/g, ";").split(";")
    var matchline = new RegExp(/^\s*(\"[^\"]*\"|[^\s]*)\s*(.*[^\s])?\s*$/)
    var prefix = ""
    for (var i in l) {
        var macro = /== *(.*[^ ]?) ==/.exec(l[i])
        if (macro != null) {
            prefix = macro[1]
            continue
        }
        var s = matchline.exec(l[i])
        if (prefix != "" && l[i] != "" && s != null) {
            s1 = this.strip(s[1], "\"")
            var empty = (s1 == "")
            var start = (!empty && s1[0] == '^')
            if (s[2] == undefined) s[2] = ""
            l2 = "\"" + (start ? "^" : "") + prefix + (empty ? "" : " ") +
                          s1.replace("^\^", "") + "\" " + s[2]
            s = matchline.exec(l2)
        }
        if (s != null) {
            s[1] = this.strip(s[1], "\"")
            if (s[2] == undefined) s[2] = ""; else s[2] = this.strip(s[2], "\"")
            var line = new this.linetype(
                new RegExp("^" + s[1].replace("^\^", "").replace("\$$", "") + "$"),
                s[2].replace(/\\n/g, "\n")
                    // call inner separator: [ ... $1 ... ] -> $(\uE00A ... \uE00A$1\uE00A ... )
                    .replace(/^[[]\$(\d\d?|\([^\)]+\))/g,"$(\uE00A\uE00A|$$$1\uE00A")
                    .replace(/[[]([^\$[\\]*)\$(\d\d?|\([^\)]+\))/g,"$(\uE00A$1\uE00A$$$2\uE00A")
                    .replace(/\uE00A]$/, "|\uE00A)") // add "|" in terminating position
                    .replace(/]/g, ")")
                    .replace(/(\$\d|\))\|\$/g,"$1||$$") // $(..)|$(..) -> $(..)||$(..)
                    .replace(/\$/g, "\uE008")
                    .replace(/\\0/g, "$$&")
                    .replace(/\\(\d)/g, "$$$1")
                    .replace(/\uE008(\d)/g, "\uE008($$$1)"),
                /^\^/.test(s[1]), /\$$/.test(s[1])
            )
            this.lines = this.lines.concat(line)
        }
    }
};
<!-- **************************************************************************************************** -->

