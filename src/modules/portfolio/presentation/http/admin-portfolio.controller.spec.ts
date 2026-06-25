import { GetDraftUseCase } from '../../application/use-cases/get-draft.use-case';
import { ListPublicationsUseCase } from '../../application/use-cases/list-publications.use-case';
import { PublishPortfolioUseCase } from '../../application/use-cases/publish-portfolio.use-case';
import { RestorePublicationUseCase } from '../../application/use-cases/restore-publication.use-case';
import { SaveDraftUseCase } from '../../application/use-cases/save-draft.use-case';
import { AdminPortfolioController } from './admin-portfolio.controller';
import { AdminLocaleParamDto } from './dto/admin-locale-param.dto';

const params: AdminLocaleParamDto = { locale: 'en' };

function build() {
  const save = {
    execute: jest.fn().mockResolvedValue({ locale: 'en', status: 'DRAFT' }),
  } as unknown as SaveDraftUseCase;
  const getDraft = {
    execute: jest.fn().mockResolvedValue({ locale: 'en', status: 'DRAFT' }),
  } as unknown as GetDraftUseCase;
  const publish = {
    execute: jest.fn().mockResolvedValue({ locale: 'en', status: 'PUBLISHED' }),
  } as unknown as PublishPortfolioUseCase;
  const listPublications = {
    execute: jest.fn().mockResolvedValue({ items: [{ version: 1 }] }),
  } as unknown as ListPublicationsUseCase;
  const restorePublication = {
    execute: jest.fn().mockResolvedValue({ locale: 'en', status: 'PUBLISHED' }),
  } as unknown as RestorePublicationUseCase;
  return {
    controller: new AdminPortfolioController(
      save,
      getDraft,
      publish,
      listPublications,
      restorePublication,
    ),
    save,
    getDraft,
    publish,
    listPublications,
    restorePublication,
  };
}

describe('AdminPortfolioController', () => {
  it('saves a draft with the raw payload', async () => {
    const { controller, save } = build();
    const body = { any: 'payload' };

    await expect(controller.saveDraft(params, body)).resolves.toMatchObject({
      status: 'DRAFT',
    });
    expect(save.execute).toHaveBeenCalledWith('en', body);
  });

  it('reads the current draft', async () => {
    const { controller, getDraft } = build();

    await expect(controller.getDraft(params)).resolves.toMatchObject({
      status: 'DRAFT',
    });
    expect(getDraft.execute).toHaveBeenCalledWith('en');
  });

  it('publishes the current draft', async () => {
    const { controller, publish } = build();

    await expect(controller.publish(params)).resolves.toMatchObject({
      status: 'PUBLISHED',
    });
    expect(publish.execute).toHaveBeenCalledWith('en');
  });

  it('lists the publication history', async () => {
    const { controller, listPublications } = build();

    await expect(controller.listPublications(params)).resolves.toMatchObject({
      items: [{ version: 1 }],
    });
    expect(listPublications.execute).toHaveBeenCalledWith('en');
  });

  it('restores a publication version', async () => {
    const { controller, restorePublication } = build();

    await expect(
      controller.restorePublication(params, 2),
    ).resolves.toMatchObject({ status: 'PUBLISHED' });
    expect(restorePublication.execute).toHaveBeenCalledWith('en', 2);
  });
});
