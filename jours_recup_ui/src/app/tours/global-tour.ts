import { IStepOption } from "ngx-ui-tour-md-menu";

export const globalTourSteps: IStepOption[] = [
    {
        anchorId: 'start',
        content: 'Bienvenue sur l\'application de gestion des jours de récupération'
    },
    {
        anchorId: 'import-db',
        content: 'Vous pouvez importer une sauvegarde à l\'aide de ce bouton.'
    },
    {
        anchorId: 'export-db',
        content: 'Vous pouvez sauvegarder dans un fichier sur votre ordinateur la base de données à l\'aide de ce bouton'
    },
    {
        anchorId: 'save-state',
        content: 'L\'état de la sauvegarde est affiché ici (rouge: non sauvegardé, vert: sauvegardé)'
    },
    {
        anchorId: 'excel-export',
        content: 'Vous pouvez exporter vers excel la base de données, à l\'aide de ce bouton'
    },
    {
        anchorId: 'search',
        content: 'Vous pouvez rechercher un utilisateur en saisissant son nom ou son prénom à l\'aide de ce champ.'
    },
    {
        anchorId: 'add-user',
        content: 'En cliquant sur ce bouton, vous pouvez ajouter un utilisateur dans la base de données',
        nextOnAnchorClick: true
    },
    {
        anchorId: 'create-user',
        content: 'Entrez, le nom et prénom de l\'utilisateur, et validez en cliquant sur créer.',
        nextOnAnchorClick: true,
        enableBackdrop: false
    },
    {
        anchorId: 'user-detail-0',
        content: 'En cliquant sur la loupe, vous pouvez éditer l\'utilisateur',
        nextOnAnchorClick: true,
        delayBeforeStepShow: 100
    },
    {
        anchorId: 'user-detail-events',
        content: 'L\'historique des modifications liés à cet utilisateur, seront visibles ici.',
        delayBeforeStepShow: 100
    },
    {
        anchorId: 'edit-user-info-Nom',
        content: 'En cliquant sur le crayon, vous pouvez éditer les informations de l\'utilisateur (nom et prénom)',
        nextOnAnchorClick: true,
    },
    {
        anchorId: 'edit-user-info-confirm-Nom',
        content: 'Vous pouvez valider en cliquant sur le bouton vert ou bien annuler les modifications en cliquant sur le bouton rouge.',
        nextOnAnchorClick: true,
    },
    {
        anchorId: 'edit-recuperation-days',
        content: 'Vous pouvez éditer le nombre de jours de récupération en cliquant sur le crayon.',
        nextOnAnchorClick: true,
    },
    {
        anchorId: 'edit-recuperation-days-data',
        content: 'Vous devez renseigner le nouveau nombre de jours de récupération, saisir une date, et une raison.',
    },
    {
        anchorId: 'edit-recuperation-days-confirm',
        content: 'Une fois renseigné, vous pouvez confirmer avec le bouton vert, ou annuler les modifications en cliquant sur le bouton rouge',
        nextOnAnchorClick: true
    },
    {
        anchorId: 'user-detail-dialog-close',
        content: 'Fermez cette boite de dialogue en cliquant sur ce bouton',
        nextOnAnchorClick: true
    },
    {
        anchorId: 'user-delete-0',
        content: 'Vous pouvez supprimer un utilisateur de la base de données en cliquant sur la corbeille.',
        nextOnAnchorClick: true,
        delayBeforeStepShow: 100
    },
    {
        anchorId: 'user-delete-0-confirm',
        content: 'Vous pouvez confirmer ou non la suppression (attention, cette action est définitive.)',
        nextOnAnchorClick: true
    },
    {
        anchorId: 'start',
        title: 'Attention !',
        content: 'Si vous utilisez edge, assurez vous que votre navigateur est bien configuré suivez le tutoriel situé sur https://t.ly/R5Jfn',
    },
    {
        anchorId: 'start',
        content: 'Lancez vous !',
        endBtnTitle: 'C\'est parti'
    },
]