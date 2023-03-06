export function Pagination() {
  const items = [];
  const countOfItems = 30;
  const pagination = <HTMLElement>document.querySelector('#pagination');
  for (let i = 1; i <= countOfItems; i++) {
    const li = document.createElement('li') as HTMLElement;
    li.innerHTML = i.toString();
    li.classList.add('page');
    pagination.appendChild(li);
    items.push(li);
  }
}
