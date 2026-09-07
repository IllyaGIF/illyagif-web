<template>
  <main class="onegram-page">
    <button class="language-button" type="button" @click="toggleLanguage">
      {{ language === 'en' ? 'По русски, пожалуйста' : 'In English, please' }}
    </button>

    <button
      class="scroll-button"
      type="button"
      :aria-label="language === 'en' ? 'Go to download' : 'Перейти к скачиванию'"
      @click="scrollToDownload"
    >
      ↓
    </button>

    <article class="onegram-content">
      <template v-if="language === 'en'">
        <header class="hero">
          <h1>Onegram</h1>
          <p class="version">Version {{ latestVersion }}</p>
        </header>

        <div class="screenshots">
          <div class="screenshots-track">
            <div class="screenshots-group">
              <img src="/1.jpg" alt="Onegram screenshot 1">
              <img src="/2.jpg" alt="Onegram screenshot 2">
              <img src="/3.jpg" alt="Onegram screenshot 3">
              <img src="/4.jpg" alt="Onegram screenshot 4">
              <img src="/5.jpg" alt="Onegram screenshot 5">
              <img src="/6.jpg" alt="Onegram screenshot 6">
            </div>

            <div class="screenshots-group" aria-hidden="true">
              <img src="/1.jpg" alt="">
              <img src="/2.jpg" alt="">
              <img src="/3.jpg" alt="">
              <img src="/4.jpg" alt="">
              <img src="/5.jpg" alt="">
              <img src="/6.jpg" alt="">
            </div>
          </div>
        </div>

        <section>
          <p class="lead">
            Onegram is an unofficial Telegram client built to bring modern
            Telegram functionality back to legacy iOS devices.
          </p>
        </section>

        <section class="release">
          <h2>Version 1.1</h2>

          <p>
            Onegram 1.1 focuses on fixing long-standing interface issues and
            improving the experience on iPad.
          </p>

          <ul>
            <li>Fixed reactions</li>
            <li>Fixed misplaced menus on iPad</li>
            <li>Fixed user nickname colors</li>
            <li>Fixed group information screen</li>
            <li>Fixed video circles on iPad</li>
            <li>Finally fixed music playback on iPad</li>
            <li>Fixed horizontally stretched static messages</li>
          </ul>
        </section>

        <div class="release-divider"></div>

        <section class="release release-old">
          <h2>Version 1.0</h2>

          <p>
            Version 1.0 is the biggest Onegram update so far. The client has
            reached the point where it can finally be used normally on old
            devices, with major improvements to stability, performance,
            messaging, media and compatibility.
          </p>
        </section>

        <section>
          <h2>iOS 4</h2>

          <p>
            The biggest part of this release is the full port of Onegram to
            iOS 4.3.
          </p>

          <p>
            This was not done by simply disabling unsupported functionality or
            raising the minimum deployment target. Large parts of the client
            were reworked to run with the frameworks, Objective-C runtime and
            C++ runtime available on iOS 4.
          </p>

          <p>
            Around 85% of the main Onegram functionality is now implemented
            and working on iOS 4.3.
          </p>

          <ul>
            <li>Full iOS 4.3 port</li>
            <li>ARC support through ARCLite</li>
            <li>Objective-C and Objective-C++ runtime compatibility</li>
            <li>Main C++ stack ported to the old libstdc++ runtime</li>
            <li>libtgvoip rebuilt for iOS 4.3</li>
            <li>TgVoipWebrtc ported to iOS 4.3</li>
            <li>WebRTC calling engine support on iOS 4</li>
            <li>Legacy GCD and libdispatch compatibility</li>
            <li>UIKit compatibility for APIs unavailable on iOS 4</li>
            <li>CoreImage fallbacks</li>
            <li>MapKit compatibility fixes</li>
            <li>Operation without GLKit where it is unavailable</li>
          </ul>

          <p>
            Onegram now actually runs modern ARC based code and the main
            calling stack on an iPhone 4 running iOS 4.3.
          </p>
        </section>

        <section>
          <h2>Performance</h2>

          <p>
            A large part of the database and message loading system was
            reworked.
          </p>

          <div class="performance">
            <div>
              <span class="performance-label">Before</span>
              <strong>1.5–1.7s</strong>
            </div>

            <div>
              <span class="performance-label">Now</span>
              <strong>0.37–0.39s</strong>
            </div>
          </div>

          <ul>
            <li>Reduced unnecessary database access</li>
            <li>Reworked expensive operations into batch queries</li>
            <li>Reduced unnecessary network requests while loading chats</li>
            <li>Reduced CPU usage while loading the chat list</li>
            <li>Faster switching between chat folders</li>
            <li>Optimized user and contact loading</li>
            <li>Reduced application startup load</li>
            <li>Reduced unnecessary message list reloads</li>
          </ul>
        </section>

        <section>
          <h2>Old devices</h2>

          <p>
            Onegram 1.0 received a lot of optimization specifically for
            devices with only 512 MB of RAM, including the iPhone 4 and
            iPhone 4S.
          </p>

          <ul>
            <li>Fixed several memory issues</li>
            <li>Improved stability during fast chat scrolling</li>
            <li>Fixed crashes when rapidly switching between chats</li>
            <li>Reduced CPU load</li>
            <li>Improved asynchronous media loading</li>
            <li>Improved loading of large chats and channels</li>
          </ul>
        </section>

        <section>
          <h2>Messages</h2>

          <ul>
            <li>Fixed loading of old messages</li>
            <li>Reworked message history pagination</li>
            <li>Fixed history loading in large chats and channels</li>
            <li>Fixed the jump to unread button crash</li>
            <li>Added handling for damaged data from old databases</li>
            <li>Reduced unnecessary message list reloads</li>
          </ul>
        </section>

        <section>
          <h2>Channels, forums and topics</h2>

          <ul>
            <li>Added comments for channel posts</li>
            <li>Improved channel post comments</li>
            <li>Added channel notification toggle</li>
            <li>Improved forums and topics</li>
            <li>Fixed pinned messages in topics</li>
            <li>Fixed chat folders</li>
          </ul>
        </section>

        <section>
          <h2>Media</h2>

          <ul>
            <li>Reworked image loading and processing</li>
            <li>Improved asynchronous media loading</li>
            <li>Fixed video loading and processing on iOS 4</li>
            <li>Improved media stability on low-memory devices</li>
            <li>Voice message and video message switching now works</li>
          </ul>
        </section>

        <section>
          <h2>Interface</h2>

          <ul>
            <li>Fixed the iOS 8 UI</li>
            <li>Fixed the keyboard on iOS 7</li>
            <li>Fixed Send and recording button overlap on iOS 4–6</li>
            <li>Fixed several navigation problems on iOS 4</li>
            <li>Added equivalents of newer UI elements missing from iOS 4</li>
          </ul>
        </section>

        <section>
          <h2>Compatibility</h2>

          <p>
            A large amount of compatibility code was rewritten across UIKit,
            Objective-C++, C++, CoreImage, GLKit, MapKit, GCD, libtgvoip and
            WebRTC.
          </p>

          <p>
            The calling engine now builds with a real iOS 4.3 deployment
            target without increasing the minimum version to iOS 5, and the
            main C++ code no longer depends on libc++.
          </p>

          <p>
            Onegram 1.0 also adds support for iOS 9 and continues to support
            legacy versions through iOS 10.
          </p>
        </section>

        <section>
          <h2>Current state</h2>

          <p>
            Onegram can now be used as a normal Telegram client on legacy
            devices, although some bugs and crashes may still remain.
          </p>

          <p>
            The iOS 4 port is approximately 85% complete. Video circles are
            currently one of the main remaining limitations on iOS 4.
          </p>

          <p>
            Development continues with a focus on stability, performance and
            removing the remaining dependencies on APIs and runtime symbols
            introduced after iOS 4.
          </p>
        </section>
      </template>

      <template v-else>
        <header class="hero">
          <h1>Onegram</h1>
          <p class="version">Версия {{ latestVersion }}</p>
        </header>

        <div class="screenshots">
          <div class="screenshots-track">
            <div class="screenshots-group">
              <img src="/1.jpg" alt="Скриншот Onegram 1">
              <img src="/2.jpg" alt="Скриншот Onegram 2">
              <img src="/3.jpg" alt="Скриншот Onegram 3">
              <img src="/4.jpg" alt="Скриншот Onegram 4">
              <img src="/5.jpg" alt="Скриншот Onegram 5">
              <img src="/6.jpg" alt="Скриншот Onegram 6">
            </div>

            <div class="screenshots-group" aria-hidden="true">
              <img src="/1.jpg" alt="">
              <img src="/2.jpg" alt="">
              <img src="/3.jpg" alt="">
              <img src="/4.jpg" alt="">
              <img src="/5.jpg" alt="">
              <img src="/6.jpg" alt="">
            </div>
          </div>
        </div>

        <section>
          <p class="lead">
            Onegram неофициальный клиент Telegram, созданный для того, чтобы
            вернуть современные возможности Telegram на старые устройства с iOS.
          </p>
        </section>

        <section class="release">
          <h2>Версия 1.1</h2>

          <p>
            Onegram 1.1 в основном посвящён исправлению накопившихся проблем
            интерфейса и улучшению работы на iPad.
          </p>

          <ul>
            <li>Исправлены реакции</li>
            <li>Исправлено расположение меню на iPad</li>
            <li>Исправлены цвета ников пользователей</li>
            <li>Исправлен экран информации о группе</li>
            <li>Исправлены видеокружки на iPad</li>
            <li>Наконец исправлено воспроизведение музыки на iPad</li>
            <li>Исправлены статично растянутые по горизонтали сообщения</li>
          </ul>
        </section>

        <div class="release-divider"></div>

        <section class="release release-old">
          <h2>Версия 1.0</h2>

          <p>
            Версия 1.0 самое большое обновление Onegram на данный момент.
            Клиент наконец дошёл до состояния, когда им можно нормально
            пользоваться на старых устройствах. Значительно улучшены
            стабильность, производительность, сообщения, медиа и совместимость.
          </p>
        </section>

        <section>
          <h2>iOS 4</h2>

          <p>
            Самая большая часть этого релиза полноценный порт Onegram на
            iOS 4.3.
          </p>

          <p>
            Это не было сделано простым отключением неподдерживаемых функций
            или повышением минимальной версии iOS. Большие части клиента были
            переработаны для работы с фреймворками, Objective-C runtime и C++
            runtime, доступными в iOS 4.
          </p>

          <p>
            Сейчас около 85% основной функциональности Onegram уже реализовано
            и работает на iOS 4.3.
          </p>

          <ul>
            <li>Полноценный порт на iOS 4.3</li>
            <li>Поддержка ARC через ARCLite</li>
            <li>Совместимость Objective-C и Objective-C++ runtime</li>
            <li>Основной C++ код перенесён на старый libstdc++</li>
            <li>libtgvoip переделан для iOS 4.3</li>
            <li>TgVoipWebrtc портирован на iOS 4.3</li>
            <li>Поддержка WebRTC ядра звонков на iOS 4</li>
            <li>Совместимость со старым GCD и libdispatch</li>
            <li>Совместимость UIKit с API, отсутствующими в iOS 4</li>
            <li>Fallback реализации CoreImage</li>
            <li>Исправлена совместимость MapKit</li>
            <li>Onegram может работать без GLKit там, где его нет</li>
          </ul>

          <p>
            Onegram теперь действительно запускает современный ARC код и
            основной стек звонков на iPhone 4 с iOS 4.3.
          </p>
        </section>

        <section>
          <h2>Производительность</h2>

          <p>
            Значительная часть базы данных и системы загрузки сообщений была
            переработана.
          </p>

          <div class="performance">
            <div>
              <span class="performance-label">Было</span>
              <strong>1.5–1.7 с</strong>
            </div>

            <div>
              <span class="performance-label">Стало</span>
              <strong>0.37–0.39 с</strong>
            </div>
          </div>

          <ul>
            <li>Уменьшено количество лишних обращений к базе данных</li>
            <li>Тяжёлые операции переделаны на batch запросы</li>
            <li>Уменьшено количество лишних запросов при загрузке чатов</li>
            <li>Снижена нагрузка на процессор при загрузке списка чатов</li>
            <li>Ускорено переключение между папками</li>
            <li>Оптимизирована загрузка пользователей и контактов</li>
            <li>Снижена нагрузка при запуске приложения</li>
            <li>Уменьшено количество лишних перезагрузок списка сообщений</li>
          </ul>
        </section>

        <section>
          <h2>Старые устройства</h2>

          <p>
            В Onegram 1.0 было сделано много оптимизаций специально для
            устройств с 512 МБ оперативной памяти, включая iPhone 4 и
            iPhone 4S.
          </p>

          <ul>
            <li>Исправлено несколько проблем с памятью</li>
            <li>Улучшена стабильность при быстрой прокрутке чатов</li>
            <li>Исправлены краши при быстром переключении между чатами</li>
            <li>Снижена нагрузка на процессор</li>
            <li>Улучшена асинхронная загрузка медиа</li>
            <li>Улучшена загрузка больших чатов и каналов</li>
          </ul>
        </section>

        <section>
          <h2>Сообщения</h2>

          <ul>
            <li>Исправлена загрузка старых сообщений</li>
            <li>Переделана пагинация истории сообщений</li>
            <li>Исправлена загрузка истории больших чатов и каналов</li>
            <li>Исправлен краш кнопки перехода к непрочитанным сообщениям</li>
            <li>Добавлена обработка повреждённых данных старой базы</li>
            <li>Уменьшено количество лишних перезагрузок сообщений</li>
          </ul>
        </section>

        <section>
          <h2>Каналы, форумы и топики</h2>

          <ul>
            <li>Добавлены комментарии к постам каналов</li>
            <li>Улучшена работа комментариев</li>
            <li>Добавлен переключатель уведомлений каналов</li>
            <li>Улучшена работа форумов и топиков</li>
            <li>Исправлены закреплённые сообщения в топиках</li>
            <li>Исправлены папки чатов</li>
          </ul>
        </section>

        <section>
          <h2>Медиа</h2>

          <ul>
            <li>Переработана загрузка и обработка изображений</li>
            <li>Улучшена асинхронная загрузка медиа</li>
            <li>Исправлена загрузка и обработка видео на iOS 4</li>
            <li>
              Улучшена стабильность медиа на устройствах с малым объёмом памяти
            </li>
            <li>
              Переключение между голосовым сообщением и видеокружком теперь
              работает
            </li>
          </ul>
        </section>

        <section>
          <h2>Интерфейс</h2>

          <ul>
            <li>Исправлен UI на iOS 8</li>
            <li>Исправлена клавиатура на iOS 7</li>
            <li>Исправлено наложение Send и кнопки записи на iOS 4–6</li>
            <li>Исправлено несколько проблем с навигацией на iOS 4</li>
            <li>Добавлены аналоги новых UI элементов, отсутствующих в iOS 4</li>
          </ul>
        </section>

        <section>
          <h2>Совместимость</h2>

          <p>
            Было переписано большое количество compatibility кода для UIKit,
            Objective-C++, C++, CoreImage, GLKit, MapKit, GCD, libtgvoip и
            WebRTC.
          </p>

          <p>
            Звонковый движок теперь собирается с настоящим deployment target
            iOS 4.3 без повышения минимальной версии до iOS 5, а основной C++
            код больше не зависит от libc++.
          </p>

          <p>
            Onegram 1.0 также добавляет поддержку iOS 9 и продолжает
            поддерживать старые версии вплоть до iOS 10.
          </p>
        </section>

        <section>
          <h2>Текущее состояние</h2>

          <p>
            Onegram уже можно использовать как обычный Telegram клиент на
            старых устройствах, хотя некоторые баги и краши всё ещё могут
            оставаться.
          </p>

          <p>
            Порт на iOS 4 завершён примерно на 85%. Видеокружки пока остаются
            одним из главных ограничений на iOS 4.
          </p>

          <p>
            Разработка продолжается с упором на стабильность,
            производительность и удаление оставшихся зависимостей от API и
            runtime символов, появившихся после iOS 4.
          </p>
        </section>
      </template>

      <footer ref="downloadSection" class="download">
        <a :href="downloadUrl" class="download-button">
          {{
            language === 'en'
              ? `Download Onegram ${latestVersion}`
              : `Скачать Onegram ${latestVersion}`
          }}
        </a>
      </footer>
    </article>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const language = ref('en')
const downloadSection = ref(null)

const latestVersion = ref('1.1')

const downloadUrl = ref(
  'https://github.com/IllyaGIF/Onegram/releases/latest/download/Onegram.ipa'
)

const toggleLanguage = () => {
  language.value = language.value === 'en' ? 'ru' : 'en'
}

const scrollToDownload = () => {
  downloadSection.value?.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  })
}

onMounted(async () => {
  try {
    const response = await fetch(
      'https://api.github.com/repos/IllyaGIF/Onegram/releases/latest'
    )

    if (!response.ok) {
      return
    }

    const release = await response.json()

    if (release.tag_name) {
      latestVersion.value = release.tag_name.replace(/^v/i, '')
    }

    const ipa = release.assets?.find(
      asset => asset.name.toLowerCase() === 'onegram.ipa'
    )

    if (ipa?.browser_download_url) {
      downloadUrl.value = ipa.browser_download_url
    }
  } catch {
  }
})

useHead(() => ({
  title: `Onegram ${latestVersion.value} — IllyaGIF`,
  meta: [
    {
      name: 'description',
      content:
        'Onegram is an unofficial Telegram client for legacy iOS devices, supporting iOS 4.3 through iOS 10.'
    }
  ]
}))
</script>

<style scoped>
.onegram-page {
  min-height: 100vh;
  box-sizing: border-box;
  overflow-x: hidden;

  background: #000;
  color: #fff;

  padding: 128px 48px 120px;
}

.onegram-content {
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
}

.language-button {
  position: fixed;
  top: 28px;
  left: 32px;
  z-index: 10;

  margin: 0;
  padding: 0;

  border: 0;
  background: transparent;

  color: rgba(255, 255, 255, 0.55);
  font: inherit;
  font-size: 15px;

  cursor: pointer;

  transition: color 160ms ease;
}

.language-button:hover {
  color: #fff;
}

.scroll-button {
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 20;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 58px;
  height: 58px;
  padding: 0;

  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 50%;

  background: rgba(20, 20, 20, 0.78);
  color: #fff;

  font: inherit;
  font-size: 27px;
  line-height: 1;

  cursor: pointer;

  -webkit-backdrop-filter: blur(18px);
  backdrop-filter: blur(18px);

  transition:
    transform 180ms ease,
    background 180ms ease,
    border-color 180ms ease;
}

.scroll-button:hover {
  transform: translateY(4px);

  background: rgba(40, 40, 40, 0.9);
  border-color: rgba(255, 255, 255, 0.32);
}

.scroll-button:active {
  transform: translateY(6px) scale(0.96);
}

.hero {
  text-align: center;
  margin-bottom: 72px;
}

.hero h1 {
  margin: 0;

  font-size: clamp(64px, 10vw, 112px);
  font-weight: 700;
  letter-spacing: -0.06em;
  line-height: 0.95;
}

.version {
  margin: 24px 0 0;

  font-size: 18px;
  color: rgba(255, 255, 255, 0.5);
}

.screenshots {
  position: relative;

  width: 100vw;
  margin-left: 50%;
  margin-bottom: 110px;

  transform: translateX(-50%);

  overflow: hidden;
}

.screenshots::before,
.screenshots::after {
  content: "";

  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 2;

  width: 90px;

  pointer-events: none;
}

.screenshots::before {
  left: 0;

  background: linear-gradient(
    to right,
    #000 0%,
    rgba(0, 0, 0, 0.85) 25%,
    rgba(0, 0, 0, 0) 100%
  );
}

.screenshots::after {
  right: 0;

  background: linear-gradient(
    to left,
    #000 0%,
    rgba(0, 0, 0, 0.85) 25%,
    rgba(0, 0, 0, 0) 100%
  );
}

.screenshots-track {
  display: flex;
  width: max-content;

  will-change: transform;

  animation: screenshots-scroll 34s linear infinite;
}

.screenshots:hover .screenshots-track {
  animation-play-state: paused;
}

.screenshots-group {
  display: flex;
  flex-shrink: 0;

  gap: 18px;
  padding-right: 18px;
}

.screenshots img {
  display: block;
  flex: 0 0 auto;

  width: auto;
  height: clamp(260px, 38vw, 430px);

  border-radius: 18px;

  object-fit: cover;

  transition: transform 220ms ease;
}

.screenshots img:hover {
  transform: scale(1.025);
}

@keyframes screenshots-scroll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

section {
  margin-bottom: 96px;
}

section h2 {
  margin: 0 0 32px;

  font-size: clamp(30px, 4vw, 42px);
  font-weight: 600;
  letter-spacing: -0.035em;
}

.release h2 {
  font-size: clamp(36px, 5vw, 52px);
}

.release-divider {
  width: 100%;
  height: 1px;

  margin: 8px 0 96px;

  background: rgba(255, 255, 255, 0.12);
}

.release-old {
  margin-bottom: 80px;
}

p,
li {
  font-size: 18px;
  line-height: 1.75;
}

p {
  margin: 0 0 24px;
}

.lead {
  font-size: clamp(24px, 3vw, 32px);
  line-height: 1.45;
  letter-spacing: -0.025em;
}

ul {
  margin: 32px 0 0;
  padding-left: 24px;
}

li {
  margin: 10px 0;
}

.performance {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 24px;

  margin: 48px 0;
}

.performance div {
  display: flex;
  flex-direction: column;

  gap: 8px;
}

.performance-label {
  color: rgba(255, 255, 255, 0.5);
  font-size: 15px;
}

.performance strong {
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 600;
  letter-spacing: -0.04em;
}

.download {
  display: flex;
  justify-content: center;

  padding-top: 72px;
  scroll-margin-top: 80px;
}

.download-button,
.download-button:visited {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 60px;
  padding: 0 36px;

  border-radius: 999px;

  background: #fff !important;

  color: #000 !important;
  -webkit-text-fill-color: #000;

  text-decoration: none !important;

  font-size: 17px;
  font-weight: 600;

  transition:
    transform 180ms ease,
    opacity 180ms ease;
}

.download-button:hover {
  color: #000 !important;
  -webkit-text-fill-color: #000;

  transform: scale(1.04);
  opacity: 0.9;
}

.download-button:active {
  transform: scale(0.98);
}

@media (max-width: 640px) {
  .onegram-page {
    padding: 96px 24px 72px;
  }

  .language-button {
    position: absolute;

    top: 24px;
    left: 24px;

    font-size: 14px;
  }

  .scroll-button {
    right: 20px;
    bottom: 20px;

    width: 52px;
    height: 52px;

    font-size: 24px;
  }

  .hero {
    margin-bottom: 56px;
  }

  .screenshots {
    margin-bottom: 80px;
  }

  .screenshots::before,
  .screenshots::after {
    width: 35px;
  }

  .screenshots-track {
    animation-duration: 28s;
  }

  .screenshots-group {
    gap: 12px;
    padding-right: 12px;
  }

  .screenshots img {
    height: min(46vh, 380px);

    max-width: calc(100vw - 40px);

    border-radius: 16px;
  }

  section {
    margin-bottom: 72px;
  }

  .release-divider {
    margin-bottom: 72px;
  }

  p,
  li {
    font-size: 17px;
  }

  .performance {
    grid-template-columns: 1fr;

    gap: 32px;
  }

  .download {
    padding-top: 48px;
  }

  .download-button {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .screenshots-track {
    animation: none;
  }
}
</style>
