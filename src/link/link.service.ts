import { Injectable } from '@nestjs/common';
import { Link, PartialLink } from './link.interface';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';

@Injectable()
export class LinkService {
  private readonly links: Link[] = [];

  public getLinkByAlias(alias: string): Link|null {
    const link = this.links
      .find(({
        alias: currentLinkAlias,
        customAlias: currentCustomAlias,
      }) => (
        (currentLinkAlias === alias)
          || (currentCustomAlias === alias)
      ));

    if (link === undefined) {
      return null;
    }

    return link;
  }

  public createLink(newLinkData: CreateLinkDto): Link {
    // TODO: handle overwritting custom alias
    const previouslyCreatedLink = this.links
      .find(({ locationUrl }) => newLinkData.locationUrl === locationUrl);

    if (previouslyCreatedLink !== undefined) {
      return previouslyCreatedLink;
    }

    const alias = Math.random().toString(36).substr(2, 9);

    const newLink: Link = {
      id: Math.floor(Math.random() * 1000),
      alias,
      ...newLinkData,
    };

    this.links.push(newLink);

    return newLink;
  }

  public updateLinkByAlias(newLinkData: UpdateLinkDto): Link|null {
    const { alias } = newLinkData;
    const linkToBeUpdatedIndex = this.links
      .findIndex(({ alias: currentLinkAlias }) => currentLinkAlias === alias);

    if (linkToBeUpdatedIndex < 0) {
      return null;
    }

    return this.updateLink(linkToBeUpdatedIndex, newLinkData);
  }

  private updateLink(
    linkIndex: number,
    newLinkData: UpdateLinkDto,
  ): Link {
    const oldLink = this.links[linkIndex];

    const newLink: Link = {
      ...oldLink,
      ...newLinkData,
    };

    this.links[linkIndex] = newLink;

    return newLink;
  }
}
