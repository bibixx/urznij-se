import { Controller, Get, Param, NotFoundException, Post, Body, Patch, Redirect } from '@nestjs/common';

import { LinkService } from './link.service';
import { GetLinkRO } from './link.interface';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { omit } from '../shared/omit';

@Controller()
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get('/:alias')
  @Redirect('https://urznij.se', 301)
  redirectToLocation(@Param('alias') alias: string) {
    const link = this.linkService.getLinkByAlias(alias);

    if (link === null) {
      throw new NotFoundException('Link with specified alias was not found');
    }

    return {
      url: link.locationUrl,
    };
  }

  @Get('/links/:alias')
  getLinkByAlias(@Param('alias') alias: string): GetLinkRO {
    const link = this.linkService.getLinkByAlias(alias);

    if (link === null) {
      throw new NotFoundException('Link with specified alias was not found');
    }

    return {
      link: omit(link, 'id'),
    };
  }

  @Post('/links')
  createLink(@Body() createLinkDto: CreateLinkDto): GetLinkRO {
    const newLink = this.linkService.createLink(createLinkDto);

    return {
      link: omit(newLink, 'id'),
    };
  }

  @Patch('/links/:alias')
  updateLink(@Body() updateLinkDto: UpdateLinkDto): GetLinkRO {
    const updatedLink = this.linkService.updateLinkByAlias(updateLinkDto);

    if (updatedLink === undefined) {
      throw new NotFoundException('Link with specified alias was not found');
    }

    return {
      link: omit(updatedLink, 'id'),
    };
  }
}
