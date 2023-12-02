# Funciones y Algoritmos

Dentro del juego sin librerias extras como CLEO, por defecto solo podemos hacer operaciones aritmeticas: SUMAS(`+`), RESTAS(`-`), MULTIPLICACIONES(`=`) y DIVICIONES(`/`).
Aunque por suerte tenemos las funciones `sin()`, `cos()` y `sqrt()` que con algo de genio, podemos hacer algunas cosas interesantes.


## Funcion `tan()`
Una tangente es la divicion de un seno por un coseno del mismo valor.
```js
let tan = x => sin(x) / cos(x)
```
En Sanny puede traducirce a esta operacion:
```sb3
:tan
	float 0@ // x
	float 1@ // tempVar

	02F7: 1@ = cosine 0@ // (float)
	02F6: 0@ = sine 0@ // (float)
	0@ /= 1@
	// OK
	// 0@<result>
return
```

## Funcion `atan()`
La funcion `atan()` retorna el arcotangente (en radianes) de un FLOAT, esto es.
Esto es un calculo pesado, por lo que presentare una funcion rapida que te aproxima al resultado que deverias de tener en una calculadora.
```js
let atan = x => Math.PI / 4 * x - x * (Math.abs(x) - 1) * (0.2447 + 0.0663 * Math.abs(x))
```
En Sanny puede traducirce a esta operacion:
```sb3
:atan
	float 0@ // x
	float 1@ // tempVar1
	float 2@ // tempVar2
	float 3@ // tempVar3
	float 4@ // tempVar4

	1@ = _PI // _PI = 3.14159265
	1@ /= 4.0
	1@ *= 0@
	1@ -= 0@

	2@ = 0@
	0097: make 2@ absolute_float
	2@ -= 1.0

	3@ = 0.2447
	3@ += 0.0663
	4@ = 0@
	0097: make 4@ absolute_float
	3@ *= 4@

	0@ = 1@
	0@ *= 2@
	0@ *= 3@
	// OK
	// 0@<result>
return
```

## Funcion `atan2()`
La funcion `atan2` devuelve el angulo cuyo tangente es el cociente de 2 numeros. La funcion toma 2 argumentos, `y`, y `x`, que representan las coordenadas del punto en el plano cartesiano. La funcion devuelve el angulo en radianes entre la recta que une el origen de coordenadas con el punto `(x, y)` y el eje positivo `x`, limitado a `-π` y `π`.Para convertir el resultado a grados, podemos multiplicar por `180/Math.PI`.
```js
let atan2 = (y, x) => {
	if (x > 0) return Math.atan(y / x);
	if (x < 0 && y >= 0) return Math.atan(y / x) + Math.PI;
	if (x < 0 && y < 0) return Math.atan(y / x) - Math.PI;
	if (x == 0 && y > 0) return Math.PI / 2;
	if (x == 0 && y < 0) return -Math.PI / 2;
	if (x == 0 && y == 0) return 0;
}
```
En Sanny puede traducirce a esta operacion:
```sb3
:atan2
	float 0@ // y
	float 1@ // x

	if 1@ > 0.0
	then
		0@ /= 1@
		return
	end
	if and
		1@ < 0.0
		0@ >= 0.0
	then
		0@ /= 1@
		0@ + _PI // _PI = 3.14159265
		return
	end
	if and
		1@ < 0.0
		0@ < 0.0
	then
		0@ /= 1@
		0@ - _PI // _PI = 3.14159265
		return
	end
	if and
		1@ == 0.0
		0@ > 0.0
	then
		0@ = _PI // _PI = 3.14159265
		0@ /= 2
		return
	end
	if and
		1@ == 0.0
		0@ < 0.0
	then
		0@ = -_PI // -_PI = -3.14159265
		0@ /= 2
		return
	end
	if and
		1@ == 0.0
		0@ == 0.0
	then
		0@ = 0.0
		return
	end
	// OK
	// 0@<result>
return
```

## Funcion `pow()`
La funcion `pow()` devuelve el valor de una base elevada a una potencia.
```js
let pow = (base,potencia) => {
	let i = base
	for (potencia; potencia > 1; potencia--) {
		base *= i
	}
	return base
}
```
En Sanny puede traducirce a esta operacion:
```sb3
:pow
	int 0@ // base
	int 1@ // potencia
	int 2@ // tempVar

	2@ = 0@
	while 1@ > 1
		0@ *= 2@
		1@--
	end
	// OK
	// 0@<result>
return
```

## Radian a Angulo
Para convertir los resultados en radianes a grados, podemos multiplicar por `180/Math.PI`.
```js
let radToAngle = x => x * 180 / Math.PI
```
En Sanny puede traducirce a esta operacion:
```sb3
:radToAngle
	float 0@ // x
	float 1@ // tempVar

	1@ = 180.0
	0@ *= 1@
	0@ /= _PI // _PI = 3.14159265
	// OK
	// 0@<result>
return
```

## Angulo a Radian
Para convertir los resultados en grados a radianes, podemos multiplicar por `Math.PI/180`.
```js
let angToRadian = x => x * Math.PI / 180
```
En Sanny puede traducirce a esta operacion:
```sb3
:angToRadian
	float 0@ // x
	float 1@ // tempVar

	1@ = _PI // _PI = 3.14159265
	0@ *= 1@
	0@ /= 180.0
	// OK
	// 0@<result>
return
```

## Concatenar Numeros
Con matematicas basicas es posible concatenar (juntar) numeros, simplemente muntilplicando uno por 10 y sumandolo a otro.
Por ejemplo si tienes el 2 y el 6, puedes hacer `2 * 10 + 6 = 26`

```js
let concatNumber = (x,base,y) => x * base + y
```
En Sanny puede traducirce a esta operacion:
```sb3
:concatNumber
	int 0@ // x
	int 1@ // base
	int 2@ // y

	0@ *= 1@
	0@ += 2@
	// OK
	// 0@<result>
return
```
## Desconcatenar Numeros
Y para desconcatenarlos, haces una dividicion entera por 10 y conseguir el resto y el cociente.
Por ejemplo, si tienes 26 y sabes que el segundo número tiene un solo dígito, puedes hacer `26 / 10 = 2` y `26 % 10 = 6`.
Dentro del juego no hay un opcode para hacer la operacion de modulo(%), por lo que tendras que calcularla de la siguiente manera
```js
let total = 26
let divisor = 10

let cociente = Math.floor(total / divisor) // 2
let resto = total - cociente * divisor // 6
```
En CLEO 4 se agrego un opcode para hacer operaciones de modulo, pero aremos de cuenta que no, para tener compatibilidad en multiples plataformas, por lo tanto...
En Sanny puede traducirce a esta operacion:
```sb3
:Module
	int 28@
	float 29@
	int 30@

	float 0@ = Math.IntToFloat_LsL(28@) // cociente
		  0@ /= 29@
	int   0@ = Math.FloatToInt_LsL(0@)

	int   1@ = 28@ 
	int	  2@ = 0@
		  2@ *= 30@
		  1@ -= 2@ // resto
	// OK
	// 0@<cociente> 1@<resto>
return
```
> La longitud de los numeros se determina siempre por el numero de ceros (0) en el `10`.

## Funcion `asin()`
La función Math.asin() de JavaScript devuelve el arco seno (en radianes) de un número. Para obtener un algoritmo equivalente, puedes seguir los siguientes pasos:

Verifica que el número esté en el rango [-1, 1]. Si no lo está, devuelve NaN.
Calcula el arco seno del número utilizando la fórmula arcsin(x) = atan(x / sqrt(1 - x^2)).
Devuelve el resultado en radianes.
Aquí hay un ejemplo de cómo implementar este algoritmo en JavaScript:
```
let asin = x => {
  if (x < -1 || x > 1) {
    return NaN;
  }

  return Math.atan(x / Math.sqrt(1 - x * x));
}
```