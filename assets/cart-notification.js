
class CartNotification extends HTMLElement {
  constructor() {
    super();

    this.notification = document.getElementById('cart-notification');
    this.header = document.querySelector('sticky-header');
    this.onBodyClick = this.handleBodyClick.bind(this);
    this.notification.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
    
    this.querySelectorAll('.cart-notification__close').forEach((closeButton) =>
      closeButton.addEventListener('click', this.close.bind(this))
    );
    
    let _this = this;
    this.querySelector('.cart-notification-product').addEventListener('click', function(e) {
      if (e.target.closest('.cart-remove-button')) {
        _this.onRemove(this.querySelector('.cart-remove-button'));
      }
    })


    this.currentItemCount = Array.from(this.querySelectorAll('[name="updates[]"]'))
      .reduce((total, quantityInput) => total + parseInt(quantityInput.value), 0);
    
    this.debouncedOnChange = debounce((event) => {
      this.onChange(event);
    }, 300);

    this.addEventListener('change', this.debouncedOnChange.bind(this));
  }

  onChange(event) {
    this.updateQuantity(event.target.dataset.index, event.target.value, document.activeElement.getAttribute('name'));
  }
  
  onRemove(event) {
    this.updateQuantity(parseInt(event.dataset.index), 0);
  }

  open() {
    this.notification.classList.add('animate', 'active');
    document.querySelector('.PageOverlay').classList.add('is-visible');
    document.body.classList.add('overflow-hidden');

    this.notification.addEventListener('transitionend', () => {
      this.notification.focus();
      trapFocus(this.notification);
    }, { once: true });

    document.body.addEventListener('click', this.onBodyClick);
  }

  close() {
    this.notification.classList.remove('active');
    document.querySelector('.PageOverlay').classList.remove('is-visible');
    document.body.classList.remove('overflow-hidden');

    document.body.removeEventListener('click', this.onBodyClick);

    removeTrapFocus(this.activeElement);
  }

  renderContents(parsedState) {
    this.productId = parsedState.id;
    console.log(this.productId);
    this.getSectionsToRender().forEach((section => {
      console.log(document.getElementById(section.id));
      document.getElementById(section.id).innerHTML = this.getSectionInnerHTML(parsedState.sections[section.id], section.selector);
    }));

    this.header?.reveal();
    this.open();
  }

  getSectionsToRender() {
    return [
      {
        id: 'cart-notification-product',
      },
      {
        id: 'cart-notification-free-ship',
      },
      {
        id: 'cart-notification-subtotal'
      },
      {
        id: 'cart-icon-bubble'
      }
    ];
  }

  updateQuantity(line, quantity, name) {
    const body = JSON.stringify({
      line,
      quantity,
      sections: this.getSectionsToRender().map((section) => section.id),
      sections_url: window.location.pathname
    });

    fetch(`${routes.cart_change_url}`, { ...fetchConfig(), ...{ body } })
      .then((response) => {
        return response.text();
      })
      .then((state) => {
        const parsedState = JSON.parse(state);
        this.getSectionsToRender().forEach((section => {
          console.log(section.id);
          document.getElementById(section.id).innerHTML = this.getSectionInnerHTML(parsedState.sections[section.id], section.selector);
        }));
      });
  }

  getSectionInnerHTML(html, selector = '.shopify-section') {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }

  handleBodyClick(evt) {
    const target = evt.target;
    if (target !== this.notification && !target.closest('cart-notification')) {
      const disclosure = target.closest('details-disclosure');
      this.activeElement = disclosure ? disclosure.querySelector('summary') : null;
      this.close();
    }
  }

  setActiveElement(element) {
    this.activeElement = element;
  }
}

customElements.define('cart-notification', CartNotification);
