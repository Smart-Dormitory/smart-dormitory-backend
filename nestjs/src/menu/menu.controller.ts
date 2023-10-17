import { Controller, Get } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async getAllMenus() {
    try {
      const menus = await this.menuService.getAllMenus();
      return { data: menus };
    } catch (error) {
      return { error: 'Failed' };
    }
  }
}
