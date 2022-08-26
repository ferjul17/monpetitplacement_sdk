import { z } from 'zod';

export const UserKycQuestionsInput = z.object({
  token: z.string(),
  provider: z.string(),
});

export const UserKycQuestionsOutput = z.object({
  '@context': z.string(),
  '@id': z.string(),
  '@type': z.string(),
  'hydra:member': z.array(
    z.object({
      '@id': z.string(),
      '@type': z.string(),
      answers: z.array(z.unknown()),
      category: z.string(),
      createdAt: z.string(),
      currentStepToPatch: z.null().or(z.unknown()),
      id: z.string(),
      identifier: z.string(),
      isSubQuestion: z.boolean(),
      name: z.string(),
      nextQuestion: z.null().or(z.unknown()),
      options: z.null().or(z.unknown()),
      parentAnswer: z.null().or(z.unknown()),
      position: z.string(),
      postAnswer: z.boolean(),
      previousQuestion: z.null().or(z.unknown()),
      seconds: z.string(),
      slug: z.string(),
      type: z.string(),
      updatedAt: z.string(),
      uuid: z.string(),
    })
  ),
  'hydra:totalItems': z.number(),
});
