/**
 * CivicFix - Modular Views Export
 */
import { AdminViews } from '../admin/adminViews.js';

export const Views = {
  landing: () => document.getElementById('template-landing').innerHTML,
  login: () => document.getElementById('template-login').innerHTML,
  myComplaints: () => document.getElementById('template-my-complaints').innerHTML,
  reportStep1: () => document.getElementById('template-report-step1').innerHTML,
  reportStep2: () => document.getElementById('template-report-step2').innerHTML,
  reportStep3: () => document.getElementById('template-report-step3').innerHTML,
  success: () => document.getElementById('template-success').innerHTML,
  tracking: () => document.getElementById('template-tracking').innerHTML,
  profile: () => document.getElementById('template-profile').innerHTML,
  admin: AdminViews
};

export { AdminViews };
