export const bookBody = () => {
  const app = document.querySelector('.book-app');
  app.innerHTML = `
<div class="main main-book">
<div class="container">
  <div class="main-inner">
    <div class="nav_groupWord">
      <div class="nav-title">Выберите раздел</div>
      <div class="group-range">
        <div class="group-range-title">Begginer</div>
        <div class="group-range-title">Intermediate</div>
        <div class="group-range-title">Advanced</div>
      </div>
      <div class="nav_group">
        <ul class="nav_group-list" id="nav_group-list">
          <li class="nav_group-list-title active_group" id="0">A1</li>
          <li class="nav_group-list-title" id="1">A2</li>
          <li class="nav_group-list-title" id="2">B1</li>
          <li class="nav_group-list-title" id="3">B2</li>
          <li class="nav_group-list-title" id="4">C1</li>
          <li class="nav_group-list-title" id="5">C2</li>
          <li class="nav_group-list-title dictionary" id="6">Сложные слова</li>
        </ul>

      </div>
    </div>
    <div class="main-word-block">
      <div class="main-word-block-title">Слова</div>
      <div id="main_word-container" class="main_word-container"></div>
      <div id="main_word-review" class="main_word-review"></div>
    </div>
    <ul id="pagination" class="pagination"></ul>
  </div>
</div>
<div class = 'buttons'>
<a href='#/audiocall'><button class='btn games-btns audiocall-btn'>Аудиовызов</button></a>
Попробуйте поиграть, чтобы лучше запомнить слова
<a href = '#/sprint'><button class="btn games-btns sprint-btn">спринт</button></a>
</div>
</div>
`;
};
