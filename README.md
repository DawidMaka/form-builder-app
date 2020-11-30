# Form Builder - Recruitment Task

Technologies and tools I've used with this project:

  - HTML5
  - CSS3 SASS preprocessor
  - BEM Methodology
  - Webpack
  - TypeScript

  Live: https://web-devvv.github.io/form-builder-app/

  Src: https://github.com/web-deVVV/form-builder-app/tree/master/src

## Details

https://drive.google.com/file/d/1arZJzvpY-8HhZsApw9BmcOwokRV2KD9g/view?usp=sharing

You’ll see in the above wireframe that there are 3 types of form inputs. Each of these can also have sub-inputs which will only show when the parent input is answered a certain way. 

The types of conditions are as follows
- Text
	- Equals - Text entered is equal to this value
- Number
	- Equals - Number entered is equal to this value
	- Greater than - Number entered is greater than this value
	- Less than - Number entered is less than this value
- Yes / No (radio)
	- Equals - Radio selected is equal to this value (either yes or no)

The user should be able to keep creating sub-inputs with conditions to as many levels deep as they would like. Each sub-input’s condition will correspond to the value of the parent input. By default, the create tab should start out blank with just the Add Input button there for the user to create their first input. This should also be stored in the local storage for persistence and loaded at page load.