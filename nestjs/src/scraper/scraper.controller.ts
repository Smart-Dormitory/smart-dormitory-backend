import { Controller, OnModuleInit } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { MenuService } from '../menu/menu.service';

@Controller('scraper')
export class ScraperController implements OnModuleInit {
  constructor(private readonly menuService: MenuService) {}

  async onModuleInit() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
      await page.goto('https://dorm.hanbat.ac.kr/sub-020502');

      // 데이터가 있는 테이블의 첫 번째 `tr` 선택
      const trElements = await page.$$('#contents > div > table > tbody > tr');

      const menus = []; // 새로운 데이터를 저장할 배열

      for (const trElement of trElements) {
        const tdElements = await trElement.$$('td');

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
        menus.push({ breakfast, lunch, dinner });
      }

      // 데이터베이스에 저장
      await this.menuService.clearAndCreateMenus(menus);
    } catch (error) {
      console.error('오류 발생:', error);
    } finally {
      await browser.close();
    }
  }
}
