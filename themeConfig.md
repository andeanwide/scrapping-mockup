## Estructura theme

el configurador de temas de la app funciona de la siguiente manera

- Tailwind.config es el objeto de configuracion de tailwind
- En primer lugar se debe crear las variables del color en el tailwind.config. archivo e igualarla a la variable css a utilizar

```
...
theme: {
    extend: {
      colors: {
        color: {
          primary: 'var(--primary)',
          'primary-shade': 'var(--primary-shade)',
        },
        dark: {
          primary: 'var(--dark-primary)',
          'primary-shade': 'var(--dark-primary-shade)',
        },
        light: {
          primary: 'var(--light-primary)',
        },
        text: {
          black: '#000',
          white: '#fff',
        },
      },
    },
  },
...
}
```

- La seccion de color es para los colores de elementos principales ajenos al background
- la seccion de dark y light es exclusiva para los colores de fondo
- la seccion text para textos
- y colorSelector son los colores que se renderizaran en la vista como opciones a seleccionar

## Archivos

Los archivos que intervienen en el proceso del cambio de colores son

1. tailwind.config.cjs
2. sidebarThemeConfig.tsx
3. utils/config.ts
4. utils/shadeHexColor.ts
5. utils/themeConfig.ts
6. utils/variables.ts
7. layout/Home.tsx

## Como funciona el cambio de tema

La funcion **applyTheme** es la que contiene toda la logica para la actualizacion de los colores del tema.

en tailwind.config tenemos una variable css llamada --primary

    color: {
    primary: 'var(--primary)',   <-------
    }

Se debe crear otra variable que contendra el color hexadecimal de --primary que se utilizara para darle color a la opcion en el frontend, entonces en el utils.variables.ts creamos esa variable como un objeto o anexaremos mas colores si la variable para color primary ya existe.

    const primaryColors = {
    'primary-blue': '#3c3c3c',
    }
    key indica el tipo de variable seguido del color en texto y como valor el color hexadecimal
    si quisiera agregar una nueva variante roja para la key seria primary-red y como value el hex del color rojo a elegir

En el sidebarThemeConfig.tsx se importa la variable **primaryColors** y la iteramos en el jsx para renderizar un boton o un div con el color de la variable como background.

    Object.values(primaryColors).map(backgroundColor: string, index:  number) => (<Button style={{ backGroundColor }} />} />))

A cada boton creado en la iteracion se debe agregar un evento onClick para llamar la funcion handleBackgroundChange, este a su vez actualiza estados y llama otra funcion updateBackgroundTheme que prepara el objeto config actual para ser enviado a applyTheme como argumento.

En el archivo utils/config.ts se debe crear la variable css --primary en la seccion de theme y le agregamos un color por defecto.

```
export  const  baseConfig  = {
company: {
name:  'Andean wide',
},
theme: {
'--primary':  '#005eb8',   <--------
'--textColor':  '#000000',
},
};
```

Una vez aplicado estos cambios el cambio de color en el sidebar de configuracion deberia ser efectivo.

## Flujo del funcionamiento

Al iniciar la app el archivo Home.tsx aplica los colores almacenados en localstorage a traves de un useEffect, en este punto la app tiene colores aplicados

Al abrir el sidebar del configurador de temas los colores aplicados tendran un borde indicando que colores estan aplicados actualmente en la app.

al seleccionar un nuevo color se usa la funciona **ApplyTheme** del archivo **themeConfig** el cual recibe 2 argumentos, el color hexadecimal y un booleano que indica si dicho color es un background , se calcula un shade del color seleccionado como variante para casos de background y tener varias tonalidades del mismo color.

El proceso anterior actualiza la variable css en el config.ts y guarda una copia en el localstorage, tailwind detecta el cambio ya que consume las variables css del config.ts en el tailwind.config.cjs y aplica el nuevo color a la variable del tailwind y esto hace el cambio en el jsx donde este aplicado dicha variable.

NOTA: Las variables css del archivo config.ts deben llamarse igual que las variables css en el tailwind.config.cjs
tailwind.config
primary: 'var(--test)',

    config.ts
    {
    	theme: {
    		--test: '#colorHexDefault'
    	}
    }

## Como aplicar los colores en el jsx

Las variables creadas en de tailwind.config.cjs podemos usarlas como clases para nuestro jsx ya que extienden del tema de tailwind donde cada objeto en la configuracion la usariamos como un guion en la className hasta llegar a la variable a usar

casos de background
En el tailwind-config existen 2 objetos, un dark y un light. Para acceder a sus valores en las className es de la siguiente manera:

    	bg-light-primary dark:bg-dark-primary

casos colores principales

    light:
    	bg-color-primary

casos bordes y similares.

    border-color-primary

## Extras

Se creo un componente para subir logos en caso de que se requiera, solo falta anexarle una ruta al endpoint a la llamada del boton en el sidebar de configuracion
