


<https://courses.edx.org/courses/course-v1:EPFLx+NiC1.0x+3T2016/course/>



# genes



## definitions

evolution
:	the change in allele frequencies in a population over time



allele
:	variant of a gene in population
:	expressed as a fraction or percentage



hardy weinberg principle
:	allele frequencies in population remains constant
:	from generation to generation
:	in the absence of evolutionary influences
:	in infinite population sizes



evolutionary influences

1.	natural selection
2.	genetic drift
3.	migration
4.	mutation

+	mate choice
+	assortative mating
+	sexual selection
+	gene flow
+	meiotic drive
+	genetic hitchhiking
+	population bottleneck
+	founder effect
+	inbreeding



diploid
:	each cell has two copies of genetic material

haploid
:	each cell has one copy of genetic material



eg.
two allele, A1 & A2
we can pack them into a A1/A1 diploid or A2/A2 diploid which will be known as heterozygous
or we can pack them into A1/A2 which is homozygous
they are genotypes

A1A1 : 15%
A1A2 : 50%
A2A2 : 35%
these are genotype frequencies
totals to 100%

A1A1 : 15 * 2 = 30 A1 alleles
A1A2 : 50 = 50 A1, 50 A2 alleles
A2A2 : 35 * 2 = 70 A2 alleles

A1 = 80 = 40%
A2 = 120 = 60%
these are allele frequencies

genotype frequencies can change in one generation
but allele frequencies will remain the same in the absence of evolutionary influences
genotype frequencies will remain constant after the inital change
the frequencies it stays at is known as the hardy weinberg frequencies



```js
		//	genotype frequencies
	var a1a1 = .15,
		a1a2 = .35,
		a2a2 = 1 - ( a1a1 + a1a2 ),

		//	allele frequencies
		p = a1a1 + ( a1a2 / 2 ),
		q = 1 - p

	console.log( 'generation 0:', a1a1, a1a2, a2a2 );

	//	calculate next generation
	a1a1 = p * p
	a1a2 = 2 * p * q
	a2a2 = q * q

	console.log( 'generation 1:', a1a1, a1a2, a2a2 );

```

```js

	//	making things more repeatable via functions & loops
	function create_next_generation() {
		a1a1 = p * p
		a1a2 = 2 * p * q
		a2a2 = q * q
	}

	for ( var i = 0; i < 5; i++ ) {
		create_next_generation()
		console.log( 'generation ' + ( i + 1 ) + ':', a1a1, a1a2, a2a2 );
	}

```

```js

	//	rounding up to x decimals by multiplying by x00 first
	//	then bring it back by dividing by x00
	//	as math.round can't specify the decimals to round to but defaults to 0
	function round_number( value, decimals ) {
		var shifter = Math.pow( 10, decimals )
		return Math.round( value * shifter ) / shifter
	}

```



---



# genetic drift



---



# mutation



---



# migration



---



# natural selection



---



# epidemics



---
