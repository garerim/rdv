-- AlterTable
ALTER TABLE `userprofile` MODIFY `nbVotesPour` INTEGER NULL DEFAULT 0,
    MODIFY `nbVotesContre` INTEGER NULL DEFAULT 0,
    MODIFY `cv` LONGTEXT NULL,
    MODIFY `description` LONGTEXT NULL;
