const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('assets')
    .select('*')
    .order('date_added', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/', async (req, res) => {
  const { name, category, serial_number, status, assigned_to, location } = req.body;

  const { data, error } = await supabase
    .from('assets')
    .insert([{ name, category, serial_number, status, assigned_to, location }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category, serial_number, status, assigned_to, location } = req.body;

  const { data, error } = await supabase
    .from('assets')
    .update({ name, category, serial_number, status, assigned_to, location })
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('assets')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
});

module.exports = router;
