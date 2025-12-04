document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.querySelector('.cards');
    const cards = document.querySelectorAll('.card');
    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');
    const currentPageSpan = document.querySelector('.pagination__text');
    const totalPagesSpan = document.querySelector('.pagination__span');
    const progressLine = document.querySelector('.pagination__line');
    
    // Настройки
    const cardsPerView = 3;
    const totalCards = cards.length;
    const totalPages = Math.ceil(totalCards / cardsPerView); // 6 / 3 = 2 страницы
    
    let currentPage = 1;
    let isAnimating = false;
    
    // Инициализация
    function initSlider() {
        // Устанавливаем общее количество страниц
        totalPagesSpan.textContent = totalPages.toString().padStart(2, '0');
        
        // Показываем первые 3 карточки
        updateSliderPosition();
        updatePagination();
    }
    
    // Обновление позиции слайдера
    function updateSliderPosition() {
        const cardWidth = 544; // Фиксированная ширина карточки
        const gap = 24; // Расстояние между карточками
        const moveDistance = (currentPage - 1) * cardsPerView * (cardWidth + gap);
        
        cardsContainer.style.transform = `translateX(-${moveDistance}px)`;
    }
    
    // Обновление пагинации
    function updatePagination() {
        // Обновляем номер текущей страницы
        currentPageSpan.textContent = currentPage.toString().padStart(2, '0');
        
        // Обновляем линию прогресса
        if (progressLine) {
            const progressPercent = (currentPage / totalPages) * 100;
            progressLine.style.width = `${progressPercent}%`;
        }
        
        // Проверяем, нужно ли отключать кнопки
        arrowLeft.classList.toggle('disabled', currentPage === 1);
        arrowRight.classList.toggle('disabled', currentPage === totalPages);
    }
    
    // Следующая страница
    function nextPage() {
        if (currentPage < totalPages && !isAnimating) {
            isAnimating = true;
            currentPage++;
            
            // Анимация перехода
            cardsContainer.style.transition = 'transform 0.5s ease-in-out';
            updateSliderPosition();
            updatePagination();
            
            // Сбрасываем флаг анимации
            setTimeout(() => {
                isAnimating = false;
            }, 500);
        }
    }
    
    // Предыдущая страница
    function prevPage() {
        if (currentPage > 1 && !isAnimating) {
            isAnimating = true;
            currentPage--;
            
            // Анимация перехода
            cardsContainer.style.transition = 'transform 0.5s ease-in-out';
            updateSliderPosition();
            updatePagination();
            
            // Сбрасываем флаг анимации
            setTimeout(() => {
                isAnimating = false;
            }, 500);
        }
    }
    
    // Инициализация
    initSlider();
    
    // Обработчики событий
    arrowLeft.addEventListener('click', prevPage);
    arrowRight.addEventListener('click', nextPage);
    
    // Добавляем стили для отключенных кнопок
    const style = document.createElement('style');
    style.textContent = `
        .arrow.disabled {
            opacity: 0.5;
            cursor: not-allowed;
            pointer-events: none;
        }
        
        .arrow.disabled:hover {
            background-color: #052838 !important;
        }
        
        .cards {
            transition: transform 0.5s ease-in-out;
        }
        
        /* Убедимся, что контейнер скрывает лишние карточки */
        .portfolio__view {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    
    // Обработка клавиатуры
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevPage();
        } else if (e.key === 'ArrowRight') {
            nextPage();
        }
    });
    
    // Свайпы для мобильных устройств (опционально)
    let touchStartX = 0;
    let touchEndX = 0;
    
    cardsContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    cardsContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Свайп влево = следующая страница
            nextPage();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Свайп вправо = предыдущая страница
            prevPage();
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const partnersSection = document.querySelector('#partners');
    const arrowLeft = partnersSection.querySelector('.arrow-left');
    const arrowRight = partnersSection.querySelector('.arrow-right');
    const currentPageSpan = partnersSection.querySelector('.pagination__text');
    const totalPagesSpan = partnersSection.querySelector('.pagination__span');
    const paginationLines = partnersSection.querySelector('.pagination__lines');
    const sliderElem = partnersSection.querySelector('.slider__elem');
    const sliderItems = partnersSection.querySelectorAll('.slider__item');
    
    // Настройки слайдера
    const totalSlides = sliderItems.length; // 3 слайда
    let currentSlideIndex = 0;
    let isAnimating = false;
    
    // Инициализация слайдера
    function initSlider() {
        // Устанавливаем общее количество слайдов (02 как на макете)
        totalPagesSpan.textContent = '02';
        
        // Настраиваем контейнер и слайды
        setupSliderStyles();
        
        // Перемещаем стрелки в правильное положение
        moveArrowsToCorrectPosition();
        
        // Создаем линии пагинации (только 2 линии как на макете)
        createPaginationLines();
        
        // Показываем первый слайд
        updatePagination();
        
        // Устанавливаем начальную позицию
        scrollToSlide(0);
    }
    
    // Настройка стилей для слайдера
    function setupSliderStyles() {
        // Контейнер слайдов
        sliderElem.style.display = 'flex';
        sliderElem.style.overflowX = 'hidden';
        sliderElem.style.scrollBehavior = 'smooth';
        sliderElem.style.position = 'relative';
        
        // Каждый слайд занимает 100% ширины
        sliderItems.forEach(slide => {
            slide.style.flex = '0 0 100%';
            slide.style.width = '100%';
            slide.style.position = 'relative';
        });
        
        // Настройка изображений
        const photos = document.querySelectorAll('.slider__photo');
        photos.forEach(photo => {
            photo.style.width = '100%';
            photo.style.height = '600px';
            photo.style.objectFit = 'cover';
            photo.style.display = 'block';
        });
    }
    
    // Перемещаем стрелки в правильное положение (вне слайдера)
    function moveArrowsToCorrectPosition() {
        // Находим контейнер слайдера
        const sliderBig = partnersSection.querySelector('.slider-big');
        
        // Перемещаем стрелки в .slider-big, чтобы они были поверх всех слайдов
        if (!arrowLeft.parentNode.classList.contains('slider-big')) {
            sliderBig.appendChild(arrowLeft);
        }
        if (!arrowRight.parentNode.classList.contains('slider-big')) {
            sliderBig.appendChild(arrowRight);
        }
    }
    
    // Создание линий пагинации (2 линии как на макете)
    function createPaginationLines() {
        paginationLines.innerHTML = '';
        
        for (let i = 0; i < 2; i++) { // Только 2 линии
            const line = document.createElement('div');
            line.className = 'pagination__line';
            if (i === 0) {
                line.classList.add('active');
                line.style.width = '50%'; // Первая линия заполнена наполовину
            } else {
                line.style.width = '0%'; // Вторая линия пустая
            }
            paginationLines.appendChild(line);
        }
    }
    
    // Прокрутка к конкретному слайду
    function scrollToSlide(index) {
        if (isAnimating || index < 0 || index >= totalSlides) return;
        
        isAnimating = true;
        currentSlideIndex = index;
        
        // Рассчитываем позицию для прокрутки
        const scrollPosition = index * sliderElem.offsetWidth;
        
        // Плавная прокрутка
        sliderElem.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        // Обновляем пагинацию
        updatePagination();
        
        // Сбрасываем флаг анимации
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }
    
    // Обновление пагинации
    function updatePagination() {
        // Обновляем номер текущего слайда (01/02, 02/02)
        const currentPage = currentSlideIndex + 1;
        currentPageSpan.textContent = currentPage.toString().padStart(2, '0');
        
        // Обновляем линии прогресса
        const lines = paginationLines.querySelectorAll('.pagination__line');
        
        if (lines.length === 2) {
            // Первая слайд: первая линия 50%, вторая 0%
            if (currentSlideIndex === 0) {
                lines[0].style.width = '50%';
                lines[0].classList.add('active');
                lines[1].style.width = '0%';
                lines[1].classList.remove('active');
            }
            // Вторая слайд: первая линия 100%, вторая 0%
            else if (currentSlideIndex === 1) {
                lines[0].style.width = '100%';
                lines[0].classList.add('active');
                lines[1].style.width = '0%';
                lines[1].classList.remove('active');
            }
            // Третья слайд: первая линия 100%, вторая 50%
            else if (currentSlideIndex === 2) {
                lines[0].style.width = '100%';
                lines[0].classList.add('active');
                lines[1].style.width = '50%';
                lines[1].classList.add('active');
            }
        }
    }
    
    // Следующий слайд
    function nextSlide() {
        if (currentSlideIndex < totalSlides - 1) {
            scrollToSlide(currentSlideIndex + 1);
        }
        // На последнем слайде ничего не делаем (как на макете)
    }
    
    // Предыдущий слайд
    function prevSlide() {
        if (currentSlideIndex > 0) {
            scrollToSlide(currentSlideIndex - 1);
        }
    }
    
    // Инициализация
    initSlider();
    
    // Обработчики событий для стрелок
    arrowLeft.addEventListener('click', prevSlide);
    arrowRight.addEventListener('click', nextSlide);
    
    // Добавляем CSS стили
    const style = document.createElement('style');
    style.textContent = `
        /* Основные стили слайдера */
        .slider-big {
            position: relative;
            overflow: visible;
        }
        
        .slider__elem {
            display: flex;
            overflow-x: hidden;
            scroll-behavior: smooth;
            scroll-snap-type: x mandatory;
            position: relative;
            width: 100%;
        }
        
        .slider__item {
            flex: 0 0 100%;
            width: 100%;
            scroll-snap-align: start;
            position: relative;
        }
        
        /* Изображение слайда */
        .slider__photo {
            width: 100%;
            height: 600px;
            object-fit: cover;
            display: block;
        }
        
        /* Стрелки - фиксированное позиционирование на изображении */
        .arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1000; /* Очень высокий z-index */
            cursor: pointer;
            width: 64px;
            height: 64px;
            background-color: #052838;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            transition: all 0.3s;
        }
        
        .arrow:hover {
            background-color: #0C3D54;
        }
        
        .arrow:active {
            background-color: #041A24;
        }
        
        .arrow-left {
            left: 24px;
            left: -32px;
            z-index: 10;
        }
        
        .arrow-right {
            right: 24px;
            right: -32px;
    z-index: 10;
        }
        
        /* Пагинация */
        .pagination {
            display: flex;
            gap: 15px;
            justify-content: center;
            align-items: center;
            margin-top: 40px;
        }
        
        .pagination__text {
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            color: #052838;
            min-width: 45px;
        }
        
        .pagination__span {
            color: #999EAD;
        }
        
        .pagination__lines {
            width: 400px;
            height: 2px;
            background-color: #D7DAE2;
            position: relative;
            overflow: hidden;
            display: flex;
        }
        
        .pagination__line {
            height: 100%;
            background-color: #052838;
            transition: width 0.5s ease;
            flex-shrink: 0;
        }
        
        .pagination__line:first-child {
            margin-right: 8px;
        }
        
        /* Скрываем скроллбар */
        .slider__elem::-webkit-scrollbar {
            display: none;
        }
        
        .slider__elem {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        
        /* Адаптивность */
        @media (max-width: 768px) {
            .arrow {
                width: 48px;
                height: 48px;
            }
            
            .arrow-left {
                left: 12px;
            }
            
            .arrow-right {
                right: 12px;
            }
            
            .slider__photo {
                height: 400px;
            }
            
            .pagination__lines {
                width: 300px;
            }
        }
        
        @media (max-width: 480px) {
            .arrow {
                width: 40px;
                height: 40px;
            }
            
            .slider__photo {
                height: 300px;
            }
            
            .pagination__lines {
                width: 200px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Обновление при изменении размера окна
    window.addEventListener('resize', function() {
        // Возвращаемся к текущему слайду после изменения размера
        setTimeout(() => {
            scrollToSlide(currentSlideIndex);
        }, 100);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq__item');
    
    // Инициализация - показываем первый открытый вопрос
    function initFAQ() {
        // Убираем класс faq__show со всех элементов
        faqItems.forEach(item => {
            item.classList.remove('faq__show');
        });
        
        // Делаем второй вопрос открытым (как в макете)
        if (faqItems.length > 1) {
            faqItems[1].classList.add('faq__show');
        }
    }
    
    // Функция для переключения состояния вопроса
    function toggleFAQ(item) {
        const isOpen = item.classList.contains('faq__show');
        
        // Закрываем все вопросы
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('faq__show');
        });
        
        // Если вопрос был закрыт - открываем его
        if (!isOpen) {
            item.classList.add('faq__show');
        }
        // Если был открыт - останется закрытым (после закрытия всех)
    }
    
    // Функция для открытия только одного вопроса (альтернативный вариант)
    function toggleFAQOne(item) {
        const isOpen = item.classList.contains('faq__show');
        
        // Закрываем все вопросы
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('faq__show');
        });
        
        // Открываем текущий, если он был закрыт
        if (!isOpen) {
            item.classList.add('faq__show');
        }
    }
    
    // Функция для открытия/закрытия каждого вопроса независимо
    function toggleFAQIndependent(item) {
        item.classList.toggle('faq__show');
    }
    
    // Добавляем обработчики клика для каждого вопроса
    faqItems.forEach(item => {
        // Клик на весь элемент
        item.addEventListener('click', function(e) {
            // Если кликнули на стрелку - предотвращаем всплытие события
            if (e.target.closest('.faq__arrow')) {
                return;
            }
            toggleFAQOne(this);
        });
        
        // Клик на стрелку
        const arrow = item.querySelector('.faq__arrow');
        if (arrow) {
            arrow.addEventListener('click', function(e) {
                e.stopPropagation(); // Останавливаем всплытие
                toggleFAQOne(item);
            });
        }
        
        // Клик на заголовок
        const title = item.querySelector('.subtitle');
        if (title) {
            title.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleFAQOne(item);
            });
        }
    });
    
    // Инициализируем FAQ
    initFAQ();
    
    // Добавляем стили для плавной анимации
    const style = document.createElement('style');
    style.textContent = `
        /* Плавная анимация открытия/закрытия */
        .faq__text {
            margin-top: 24px;
            display: none;
            opacity: 0;
            max-height: 0;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        
        .faq__show .faq__text {
            display: block;
            opacity: 1;
            max-height: 500px; /* Достаточно большое значение для контента */
            transition: all 0.3s ease;
        }
        
        /* Анимация стрелки */
        .faq__arrow svg {
            transition: transform 0.3s ease;
        }
        
        .faq__show .faq__arrow svg {
            transform: rotate(180deg);
        }
        
        /* Дополнительные стили для лучшего UX */
        .faq__item {
            transition: background-color 0.2s ease;
        }
        
        .faq__item:hover {
            background-color: #F7F8FA;
        }
        
        .subtitle {
            cursor: pointer;
            user-select: none;
        }
        
        .faq__arrow {
            cursor: pointer;
            transition: background-color 0.2s ease;
        }
    `;
    document.head.appendChild(style);
});
