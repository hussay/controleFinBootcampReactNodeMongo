const express = require('express');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const TransactionModel = require('../models/TransactionModel');
const recreateCollections = require('../bd/populateMongoDb');
const transactionRouter = express.Router();

transactionRouter.get('/restore', async (req, res) => {
    const restore = await recreateCollections();

    try {
      res.send("ok");
    } catch (err) {
      res.status(500).send(err);
    }
});

transactionRouter.get('/periodos', async (req, res) => {
  
  const periodosDistintos = await  TransactionModel.find().distinct('yearMonth');
  try {
    res.json(periodosDistintos);
  } catch (err) {
    res.status(500).send(err);
  }
});

transactionRouter.get('/', async (req, res) => {
    const periodo = req.query.period;
    if(!periodo){
        res.status(400).send({
            message:
              'Necessário informar /?period com um valor YYYY-MM',
          });
    }
    const transacao = await TransactionModel.find({yearMonth: periodo });

    try {
      res.send(transacao);
    } catch (err) {
      res.status(500).send(err);
    }
});
  
transactionRouter.post('/', async (req, res) => {
    const salvartransacao = new TransactionModel(req.body);
  
    try {
      await salvartransacao.save();
      res.send(salvartransacao);
    } catch (err) {
      res.status(500).send(err);
    }
 });
  
transactionRouter.delete('/:id', async (req, res) => {
    try {
      const deleteTransacao = await TransactionModel.findOneAndDelete({ _id: req.params.id});
  
      if (!deleteTransacao) {
        res.status(404).send({
            message:
              'Transacao não encontrada',
          });
      }
  
      res.status(200).send({
        message:
          'Deletado com sucesso',
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
transactionRouter.put('/:id', async (req, res) => {
    try {
      const atualizaTransacao = await TransactionModel.findOneAndUpdate(
        { _id: req.params.id},
        req.body,
        { new: true }
      );
  
      res.send(atualizaTransacao);
    } catch (err) {
      res.status(500).send(err);
    }
  });



module.exports = transactionRouter;
