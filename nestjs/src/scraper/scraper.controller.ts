import { Controller, Get } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { MenuService } from '../menu/menu.service';
import { NoticeService } from '../notice/notice.service';

@Controller('scraper')
export class ScraperController {
  constructor(
    private readonly menuService: MenuService,
    private readonly noticeService: NoticeService,
  ) {}

  @Get('setNewMenu')
  async getMenu() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
      await page.goto('https://dorm.hanbat.ac.kr/sub-020502');

      // 데이터가 있는 테이블의 첫 번째 `tr` 선택
      const trElements = await page.$$('#contents > div > table > tbody > tr');

      const menus = []; // 새로운 데이터를 저장할 배열

      for (const trElement of trElements) {
        const tdElements = await trElement.$$('td');
        const thElements = await trElement.$$('th');

        const date = await page.evaluate((element) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return element
            ? element.textContent?.replace(/\(\S+\)/, '') || '' // 정규식을 사용하여 마지막 괄호와 그 안의 단어들을 제외
            : '';
        }, thElements[0]);

        const breakfast = await page.evaluate((element) => {
          return element
            ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              element.textContent
                .replace(/\n/g, ' ')
                .replace(/\s+/g, ' ')
                .trim()
            : '';
        }, tdElements[0]);

        const lunch = await page.evaluate((element) => {
          return element
            ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              element.textContent
                .replace(/\n/g, ' ')
                .replace(/\s+/g, ' ')
                .trim()
            : '';
        }, tdElements[1]);

        const dinner = await page.evaluate((element) => {
          return element
            ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              element.textContent
                .replace(/\n/g, ' ')
                .replace(/\s+/g, ' ')
                .trim()
            : '';
        }, tdElements[2]);

        // 데이터를 객체로 만들어 배열에 추가
        menus.push({ date, breakfast, lunch, dinner });
      }

      // 데이터베이스에 저장
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await this.menuService.clearAndCreateMenus(menus);
    } catch (error) {
      console.error('오류 발생:', error);
    } finally {
      await browser.close();
    }
  }

  @Get('setNewNotice')
  async setNewNotice() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
      await page.goto('https://dorm.hanbat.ac.kr/sub-0501');

      // 모든 tr 요소 선택
      const trElements = await page.$$(
        '#contents > div.table-type-01 > table > tbody > tr',
      );

      const notice = []; // 새로운 데이터를 저장할 배열

      // 각 tr 요소에 대해 반복
      for (const trElement of trElements) {
        // 현재 tr 요소에서 3번째 td 선택
        const thirdTdElement = await trElement.$('td:nth-child(3)');

        if (!thirdTdElement) {
          // 3번째 td가 없을 경우 skip
          continue;
        }

        // 3번째 td에서 a 태그 찾기
        const linkElement = await thirdTdElement.$('a');

        if (!linkElement) {
          // a 태그가 없을 경우 skip
          continue;
        }

        // a 태그의 텍스트와 href 속성 값 가져오기
        const title = await page.evaluate((element) => {
          return element ? element.textContent?.trim() || '' : ''; // 공백 제거
        }, linkElement);

        const href = await page.evaluate((element) => {
          return element
            ? `https://dorm.hanbat.ac.kr${
                element.getAttribute('href') || ''
              }` || ''
            : ''; // null 대신 빈 문자열 반환
        }, linkElement);

        // title이 비어있지 않을 때만 추가
        if (title.trim() !== '') {
          notice.push({ title, href });
        }

        // 로그를 추가하여 3번째 td에서 추출한 값 확인
        console.log(`3번째 td에서 추출한 값: ${title} - ${href}`);
      }

      // 데이터베이스에 저장
      await this.noticeService.clearAndCreateNotice(notice);
    } catch (error) {
      console.error('오류 발생:', error);
    } finally {
      await browser.close();
    }
  }
}
