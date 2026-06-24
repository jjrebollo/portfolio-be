import { GetDraftUseCase } from '../../application/use-cases/get-draft.use-case';
import { PublishPortfolioUseCase } from '../../application/use-cases/publish-portfolio.use-case';
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
  return {
    controller: new AdminPortfolioController(save, getDraft, publish),
    save,
    getDraft,
    publish,
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
});
