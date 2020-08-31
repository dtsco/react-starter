## Stack

- Boilerplate: [CRA](https://github.com/facebook/create-react-app)
- Routing: [React Router](https://github.com/ReactTraining/react-router)
- State Management: [Redux](https://github.com/reduxjs/react-redux)
- UI Library: [Ant Design](https://github.com/ant-design/ant-design/)
- Styling: [TailwindCSS](https://github.com/tailwindcss/tailwindcss) and [Styled Components](https://github.com/styled-components/styled-components)
- Forms: [React Hook Form](https://github.com/react-hook-form/react-hook-form)
- i18n: [i18next](https://github.com/i18next/react-i18next)
- Http Client: [Axios](https://github.com/axios/axios)
- Utilities: [Lodash](https://github.com/lodash/lodash), [Redux Toolkit](https://github.com/reduxjs/redux-toolkit)
- Code Style: [Prettier](https://github.com/prettier/prettier) with [pre-commit git hook](https://github.com/typicode/husky)

## Directory structure

```html
- components // тут должны быть любые компоненты, которые используются на 2-ых и более pages
	- CheckboxTable // пример таблицы с чекбоксами
		- TableWrapper.js // styled компонент
		- CheckboxTd.js // компонент td с чекбоксом
		- ...
		- CheckboxTable.js // Общий компонент с логикой (или без)
		- index.js // import/export компонент
	- ...
- layouts // тут должны быть шаблоны страниц
	- default // default должен быть всегда
		- DefaultLayout.js
		- index.js
	- ...
- pages // стартовые компоненты, которые используются роутингом
	- home // название страниц с маленькой буквы (должно быть кратко как и path страницы)
		- components // компонента, которые используются только на этой странице
			- One.js // они могут как свои кастомные
			- Two.js // так и styled обертки
			- ...
			- index.js
		- reducer // файлы для redux этой страницы
			- actions.js
			- saga.js
			- selectors.js
			- index.js
		- SomeMoreContainer.js // страница может быть из нескольких контейнеров (обычно, что бы проще было управлять страницей) p.s. в целом эти контейнеры могут реюзаться на других страницах (пример - модалка добавления какой сущности из другой страницы)
		- ...
		- HomePage.js // главный контейнер
		- index.js
	- ...
- store // настройка store и глобальные reducers
	- actions
		- ...
		- index.js
	- reducers
		- ...
		- index.js
	- sagas
		- ...
		- index.js
	- selectors
		- ...
		- index.js
	- index.js
- routes // ???
	- ...
- hooks // ???
	- ...
- utils // ???
	- ...
- locales // конфиги для локализации
    - ru.json // json файлы локализации
    - ...
    - en.json
- i18n.js // настройка локализации
- history.js // настройка history роутинга
- App.js // root компонент приложения
- index.js // entry point приложения
```

## Tips

1. Делайте компоненты небольшими и отвечающими за конкретный функционал
2. Повторное использование это важный момент, старайтесь довести создание новых компонентов до возможного минимума
3. Консолидируйте повторяющийся код — придерживайтесь правила DRY (Don’t Repeat Yourself)
4. Именуйте компоненты в соответствии с их функционалом
5. Разделяйте аспекты связанные со сменой стейта (логикой) от рендеринга
6. Все относящиеся к компоненту файлы должны находиться в одном месте
7. Соблюдайте правила линтинга

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
